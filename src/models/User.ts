import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    followers: mongoose.Types.ObjectId[],
    following: mongoose.Types.ObjectId[],
    createdAt: Date;
    updateAt: Date;
}

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true

    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    followers: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
        ],
        default: []
    },
    following: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
        ],
        default: []
    },
},
    {
        timestamps: true
    }

)

export default mongoose.model<IUser>("User", UserSchema);