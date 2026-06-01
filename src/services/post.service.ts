import Post from "../models/Post";
import User from "../models/User";
import { AppError } from "../utils/AppError";

export const createPost = async (content: string, userId: string) => {

    const post = await Post.create({
        content,
        author: userId
    });

    return post;
}


export const getAllPosts = async (
    page: number,
    limit: number
) => {
    const skip = (page - 1) * limit;

    const posts = await Post.find()
        .populate("author", "username email")
        .populate("comments.user", "username")
        .sort({ createdAt: -1 }) //Este cambio de - 1 a -1 es porque como ordena de atras a adelante lo hace de -1++ y no - 1, que seria restando al total. 
        .skip(skip)
        .limit(limit);

    const total = await Post.countDocuments();

    return {
        posts,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalPost: total,
    };
};

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

    const populatedPost = await Post.findById(post._id).populate("author", "username").populate("comments.user", "username");

    return populatedPost;
}


export const getFeed = async (userId: string, page: number, limit: number) => {

    const user = await User.findById(userId);

    if (!user) { throw new AppError("Usuario no encontrado", 404); }

    const skip = (page - 1) + limit;

    const authors = [
        ...user.following,
        user._id
    ]

    const posts = await Post.find({
        author: {
            $in: authors
        }
    }).populate("author", "username").sort({ createdAt: -1 }).skip(skip).limit(limit);


    const total = await Post.countDocuments({
        author: {
            $in: authors
        }
    })

    return {
        posts,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalPost: total,
    }


}