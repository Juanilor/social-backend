import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { error } from "node:console";
import { AppError } from "../utils/AppError";

export const registerUser = async (
    username: string,
    email: string,
    password: string
) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new AppError("El usuario ya existe.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    const userObj = user.toObject();
    delete userObj.password;

    return userObj;
}

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError("El usuario no existe", 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new AppError("Credenciales invalidas", 401);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

    const userObj = user.toObject();
    delete userObj.password;


    return { user: userObj, token }

}