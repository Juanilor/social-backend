import User from "../models/User";
import { AppError } from "../utils/AppError";


export const followUser = async (currentUserId: string, targetUserId: string) => {

    if(currentUserId === targetUserId){
        throw new AppError("No puedes seguirte a ti mismo.", 400);
    }

    const currentUser = await User.findById(currentUserId);

    const targetUser = await User.findById(targetUserId);

    if(!currentUser || !targetUser){
        throw new AppError("Usuario no encontrado", 400);
    }

    const alreadyFollowing = currentUser.following.includes(targetUser._id);

    if(alreadyFollowing){
        throw new AppError("Ya sigues a este usuario.", 400);
    }

    currentUser.following.push(targetUser._id);

    targetUser.followers.push(currentUser._id);

    await currentUser.save();
    await targetUser.save();

    return{
        message: "Usuario seguido correctamente",
    };

};