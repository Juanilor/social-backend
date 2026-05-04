import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { error } from "node:console";

export const registerUser = async (
    username: string,
    email: string,
    password: string
) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("El usuario ya existe.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    return user;
}