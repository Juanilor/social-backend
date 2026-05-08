import mongoose, { Schema } from "mongoose";

interface IComments {
    user: mongoose.Types.ObjectId;
    content: string;
    createAt?: Date;
}
export interface IPost extends Document {

    content: string;
    author: mongoose.Types.ObjectId;
    likes: mongoose.Types.ObjectId[];
    comments: IComments;
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
        }],
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                content: {
                    type: String,
                    required: true,
                    trim: true
                },
                createAt: {
                    type: Date,
                    default: Date.now,
                }
            }
        ]
    },
    { timestamps: true }
);


export default mongoose.model<IPost>("Post", PostSchema);