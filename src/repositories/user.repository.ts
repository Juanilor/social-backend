import User from "../models/User";

export const findUserById = async (id: string) => User.findById(id);

export const findUserByIdWithoutPassword = async (id: string) => User.findById(id).select("-password");

export const findUserByIdAndPopulate = async (id: string, p1: string, p2: string) => User.findById(id).populate(p1, p2);

export const saveUser = async (user: any) => user.save();