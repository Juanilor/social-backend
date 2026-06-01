import { Response, NextFunction } from "express";

import { AuthRequest } from "../middlewares/auth.middleware";

import { getUserProfile, toggleFollow } from "../services/user.service";

import { successResponse } from "../helpers/response.helper";


export const follow = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const targetUserId = req.params.id as string;


        const result = await toggleFollow(
            req.user.id,
            targetUserId
        );

        return successResponse(res, result, result.following ? "Usuario seguido correctamente" : "Se dejo de seguir usuario");

    } catch (error) {
        next(error);
    }
}


export const profile = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    try {
        const userId = req.params.id;

        const user = await getUserProfile(userId as string);

        return successResponse(
            res,
            user
        );

    }catch(error){
        next(error);
    }


}