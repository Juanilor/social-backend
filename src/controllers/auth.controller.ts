import { Request, Response } from "express";

import { registerUser, loginUser } from "../services/auth.service";

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