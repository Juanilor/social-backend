import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string, { expiresIn: '7d' }
    )

    const userObj = user.toObject();

    const { password: _password, ...userWithoutPassword } = userObj;

    return {user: userWithoutPassword, token};
}

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError("El usuario no existe", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new AppError("Credenciales invalidas", 401);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

    const userObj = user.toObject();
    const { password: _password, ...userWithoutPassword } = userObj;


    return { user: userWithoutPassword, token }

}