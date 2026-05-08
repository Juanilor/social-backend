import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { createPost, getAllPost, toggleLike, deletePost, addComment } from "../services/post.service";

export const create = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { content } = req.body;

        const post = await createPost(content, req.user.id);

        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {

    try {
        const posts = await getAllPost();

        res.json(posts);
    } catch (error) {
        next(error);
    }
};


export const like = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {

        const { postId } = req.params;

        const post = await toggleLike(postId, req.user.id);

        res.json(post);

    } catch (error) {
        next(error)
    }
};

export const remove = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { postId } = req.params;

        const result = await deletePost(postId, req.user.id);

        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const comment = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {

        const { postId } = req.params;
        const { content } = req.body;

        const post = await addComment(
            postId,
            req.user.id,
            content
        );

        res.json(post);
    } catch (error) {
        next(error);
    }
}