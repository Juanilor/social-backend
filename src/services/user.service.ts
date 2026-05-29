import User from "../models/User";

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

    const currentUser = await User.findById(currentUserId);

    const targetUser = await User.findById(targetUserId);

    if (!currentUser || !targetUser) {
        throw new AppError(
            "Usuario no encontrado", 404
        );
    };

    const alreadyFollowing = currentUser.following.includes(targetUserId as any);

    if (alreadyFollowing) {

        currentUser.following = currentUser.following.filter((id) => id.toString() !== targetUserId);

        targetUser.followers = targetUser.followers.filter((id) => id.toString() !== currentUser);

    } else {
        currentUser.following.push(targetUserId as any);
        targetUser.followers.push(currentUserId as any);

    }

    await currentUser.save();
    await targetUser.save();

    return {
        following: !alreadyFollowing
    }

}