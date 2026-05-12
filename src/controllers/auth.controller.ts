import { NextFunction, Request, Response } from "express";

import { registerUser, loginUser } from "../services/auth.service";

import User from "../models/User";

import { AuthRequest } from "../middlewares/auth.middleware";


export const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.json(user);
    } catch (error) {
        next(error);
    }
};


export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;

        const user = await registerUser(username, email, password);

        res.status(201).json(user);
    } catch (error) {
        next(error)
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const data = await loginUser(email, password);

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

