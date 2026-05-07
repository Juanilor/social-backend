import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { createPost, getAllPost, toggleLike } from "../services/post.service";

export const create = async (req: AuthRequest, res: Response) => {
    try {
        const { content } = req.body;

        const post = await createPost(content, req.user.id);

        res.status(200).json(post);
    }catch (error: any){
        res.status(400).json({message: error.message});
    }
};

export const getAll = async (_req: Request, res: Response) => {

    try{
        const posts = await getAllPost();

        res.json(posts);
    }catch (error: any){
        res.status(500).json({message: "Error de servidor"});
    }
};


export const like = async (req: AuthRequest, res: Response) => {
    try{
        
        const { postId } = req.params;

        const post = await toggleLike(postId, req.user.id);

        res.json(post);

    }catch (error: any){
        res.status(400).json({message: error.message});
    }
};