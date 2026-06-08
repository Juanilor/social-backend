import Post from "../models/Post";


export const createPostRepository = async (userId: string, content: string) => {
    return Post.create({
        content,
        author: userId
    })
}

export const findPostById = async (id: string) => Post.findById(id);

export const findPostWithComments = async (id: string) => { return Post.findById(id).populate("author", "username").populate("comments.user", "username"); }

export const countPostsByAuthor = async (authorId: string) => Post.countDocuments({ author: authorId });

export const countTotalPost = async () => Post.countDocuments();


export const deleteOnePost = async (post: any) => post.deleteOne();

export const savePost = async (post: any) => post.save()

export const getAllPostsRepository = async (skip: number, limit: number) => {

    return Post.find().populate("author", "username email")
        .populate("comments.user", "username")
        .sort({ createdAt: -1 }) //Este cambio de - 1 a -1 es porque como ordena de atras a adelante lo hace de -1++ y no - 1, que seria restando al total. 
        .skip(skip)
        .limit(limit);
}

export const findFeedPosts = async (authors: any, skip: number, limit: number) => {

    return Post.find({
        author: {
            $in: authors
        }
    })
        .populate("author", "username email")
        .populate("comments.user", "username")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
};

export const countFeedPost = async (authors: any[]) => {
    return Post.countDocuments({
        author: {
            $in: authors
        }
    })
};