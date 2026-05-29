import { NextFunction, Request, Response } from "express";

import { registerUser, loginUser } from "../services/auth.service";

import User from "../models/User";

import { AuthRequest } from "../middlewares/auth.middleware";
import { successResponse } from "../helpers/response.helper";


export const getMeUserController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

       return successResponse(res, user, "Usuario autenticado.");
    } catch (error) {
        next(error);
    }
};


export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;

        const data = await registerUser(username, email, password);

        return successResponse(res, data, "Usuario registrado correctamente.", 201)
    } catch (error) {
        next(error)
    }
};

export const loginUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const data = await loginUser(email, password);

        return successResponse(res, data, "Login exitoso.");
    } catch (error) {
        next(error);
    }
}

