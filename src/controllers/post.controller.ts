import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { createPost, getAllPost, toggleLike, deletePost, addComment } from "../services/post.service";

export const create = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { content } = req.body;

        const post = await createPost(content, req.user.id);

        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
};

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {

    try {
        const page = Number(_req.query.page) || 1;

        const limit = Number(_req.query.limit) || 10;

        const posts = await getAllPost(page, limit);

        res.status(200).json(posts);

    } catch (error) {
        next(error);
    }
};


export const like = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {

        const postId = req.params.postId as string;

        const post = await toggleLike(postId, req.user.id);

        res.status(200).json(post);

    } catch (error) {
        next(error)
    }
};

export const remove = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {

        const postId = req.params.postId as string;

        const result = await deletePost(postId, req.user.id);

        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const comment = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {


        const postId = req.params.postId as string;
        const { content } = req.body;

        const post = await addComment(
            postId,
            req.user.id,
            content
        );

        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
}