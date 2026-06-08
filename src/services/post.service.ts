import Post from "../models/Post";
import User from "../models/User";
import { countFeedPost, countTotalPost, createPostRepository, deleteOnePost, findFeedPosts, findPostById, findPostWithComments, getAllPostsRepository, savePost } from "../repositories/post.repository";
import { findUserById } from "../repositories/user.repository";
import { AppError } from "../utils/AppError";

export const createPost = async (content: string, userId: string) => {

    const post = await createPostRepository(userId, content);

    return post;
}


export const getAllPosts = async (
    page: number,
    limit: number
) => {
    const skip = (page - 1) * limit;

    const posts = await getAllPostsRepository(skip, limit);

    const total = await countTotalPost();

    return {
        posts,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalPost: total,
    };
};

export const toggleLike = async (postId: string, userId: string) => {
    const post = await findPostById(postId);

    if (!post) {
        throw new AppError("Post no encontrado", 404);
    }

    const alreadyLiked = post.likes.includes(userId as any);

    if (alreadyLiked) {
        post.likes = post.likes.filter(
            (id) => id.toString() !== userId
        );
    } else {
        post.likes.push(userId as any);
    }

    await savePost(post);

    return post;
}


export const deletePost = async (postId: string, userId: string) => {

    const post = await findPostById(postId);

    if (!post) {
        throw new AppError("Post no encontrado.", 404);
    }

    if (post.author.toString() !== userId) {
        throw new AppError("No autorizado.", 403);
    }


    await deleteOnePost(post);

    return {
        message: "Post eliminado."
    };
}


export const addComment = async (postId: string, userId: string, content: string) => {

    const post = await findPostById(postId);

    if (!post) {
        throw new AppError("Post no encontrado", 404);
    }

    post.comments.push({
        user: userId as any,
        content
    });

    await savePost(post);

    const populatedPost = await findPostWithComments(postId);

    return populatedPost;
}


export const getFeed = async (userId: string, page: number, limit: number) => {

    const user = await findUserById(userId);

    if (!user) { throw new AppError("Usuario no encontrado", 404); }

    const skip = (page - 1) * limit;

    const authors = [
        ...user.following,
        user._id
    ]

    const posts = await findFeedPosts(authors, skip, limit);

    const total = await countFeedPost(authors)

    return {
        posts,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalPost: total,
    }
}