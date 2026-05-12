import Post from "../models/Post";
import { AppError } from "../utils/AppError";

export const createPost = async (content: string, userId: string) => {

    const post = await Post.create({
        content,
        author: userId
    });

    return post;
}


export const getAllPost = async () => {
    const posts = await Post.find()
        .populate("author", "username email")
        .populate("comments.user", "username")
        .sort({ createAt: - 1 });

    return posts;
}

export const toggleLike = async (postId: string, userId: string) => {
    const post = await Post.findById(postId);

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

    await post.save();

    return post;
}


export const deletePost = async (postId: string, userId: string) => {

    const post = await Post.findById(postId);

    if (!post) {
        throw new AppError("Post no encontrado.", 404);
    }

    if (post.author.toString() !== userId) {
        throw new AppError("No autorizado.", 403);
    }


    await post.deleteOne();

    return {
        message: "Post eliminado."
    };
}


export const addComment = async (postId: string, userId: string, content: string) => {

    const post = await Post.findById(postId);

    if (!post) {
        throw new AppError("Post no encontrado", 404);
    }

    post.comments.push({
        user: userId as any,
        content
    });

    await post.save();

    return post;

}