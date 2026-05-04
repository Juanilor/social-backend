import { Request, Response } from "express";

import { registerUser, loginUser } from "../services/auth.service";

import User from "../models/User";

import { AuthRequest } from "../middlewares/auth.middleware";


export const getMe = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error de servidor" });
    }
};


export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const user = await registerUser(username, email, password);

        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const data = await loginUser(email, password);

        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

