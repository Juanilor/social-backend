import { countPostsByAuthor } from "../repositories/post.repository";
import { findUserById, findUserByIdAndPopulate, findUserByIdWithoutPassword, saveUser } from "../repositories/user.repository";

import { AppError } from "../utils/AppError";

export const toggleFollow = async (
    currentUserId: string,
    targetUserId: string
) => {

    if (currentUserId === targetUserId) {
        throw new AppError(
            "No puedes seguirte a ti mismo.",
            400
        );
    };

    const currentUser = await findUserById(currentUserId);

    const targetUser = await findUserById(targetUserId);

    if (!currentUser || !targetUser) {
        throw new AppError(
            "Usuario no encontrado", 404
        );
    };

    const alreadyFollowing = currentUser.following.some(
        id => id.toString() === targetUserId
    );

    if (alreadyFollowing) {

        currentUser.following = currentUser.following.filter((id) => id.toString() !== targetUserId);

        targetUser.followers = targetUser.followers.filter((id) => id.toString() !== currentUserId);

    } else {
        currentUser.following.push(targetUserId as any);
        targetUser.followers.push(currentUserId as any);

    }

    await saveUser(currentUser);
    await saveUser(targetUser);

    return {
        following: !alreadyFollowing,
        followersCount: targetUser.followers.length,
        followingCount: currentUser.following.length,
    }

}


export const getUserProfile = async (userId: string) => {


    const user = await findUserByIdWithoutPassword(userId);

    if (!user) {
        throw new AppError("Usuario no disponible.", 404);
    }


    const postCount = await countPostsByAuthor(userId);


    return {
        ...user.toObject(),
        followerCount: user.followers.length,
        followingCount: user.following.length,
        postCount
    }

}

export const getFollowers = async (userId: string) => {

    const user = await findUserByIdAndPopulate(userId, 'followers', 'username email');

    if (!user) {
        throw new AppError("Usuario no encontrado", 404);
    }

    return {
        followers: user.followers,
        totalFollowers: user.followers.length,
    };

}

export const getFollowing = async (userId: string) => {

    const user = await findUserByIdAndPopulate(userId, 'following', 'username email');

    if (!user) {
        throw new AppError("Usuario no encontrado", 404);
    }

    return {
        following: user.following,
        totalFollowing: user.following.length,
    };

}