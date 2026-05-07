import mongoose, { Schema } from "mongoose";

export interface IPost extends Document {

    content: string;
    author: mongoose.Types.ObjectId;
    likes: mongoose.Types.ObjectId[];
    createAt: Date;

}

const PostSchema = new Schema<IPost>(
    {
        content: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        likes: [{
            type: mongoose.Types.ObjectId,
            ref: "User"
        }]
    },
    { timestamps: true }
);


export default mongoose.model<IPost>("Post", PostSchema);