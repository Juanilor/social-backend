import { Response, NextFunction } from "express";

import { AuthRequest } from "../middlewares/auth.middleware";

import { toggleFollow } from "../services/user.service";

import { successResponse } from "../helpers/response.helper";


export const follow = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const targetUserId = req.params.id;


        const result = await toggleFollow(
            req.user.id,
            targetUserId
        );

        return successResponse(res, result, result.following ? "Usuario seguido correctamente" : "Se dejo de seguir usuario");

    } catch (error) {
        next(error);
    }
}