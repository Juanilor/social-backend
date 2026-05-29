import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { createPost, getAllPosts, toggleLike, deletePost, addComment } from "../services/post.service";
import { successResponse } from "../helpers/response.helper";

export const createPostController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { content } = req.body;

        const post = await createPost(content, req.user.id);

        return successResponse(res, post, "Post creado correctamente.", 201);
    } catch (error) {
        next(error);
    }
};

export const getAllPostsController = async (_req: Request, res: Response, next: NextFunction) => {

    try {
        const page = Number(_req.query.page) || 1;

        const limit = Number(_req.query.limit) || 10;

        const posts = await getAllPosts(page, limit);

        return successResponse(res, posts)

    } catch (error) {
        next(error);
    }
};


export const likePostController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {

        const postId = req.params.postId as string;

        const post = await toggleLike(postId, req.user.id);

        return successResponse(res, post, "Like actualizado.");

    } catch (error) {
        next(error)
    }
};

export const removePostController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {

        const postId = req.params.postId as string;

        const result = await deletePost(postId, req.user.id);

        return successResponse(res, result, "Post eliminado.");

    } catch (error) {
        next(error);
    }
};

export const commentPostController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {


        const postId = req.params.postId as string;
        const { content } = req.body;

        const post = await addComment(
            postId,
            req.user.id,
            content
        );

        return successResponse(res,post, "Comentario creado.", 201);
    } catch (error) {
        next(error);
    }
}