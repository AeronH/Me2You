import mongoose, { Schema } from "mongoose";
import Post from "../utils/types";

const postSchema: Schema = new mongoose.Schema({
    bodyText: {
        required: true,
        type: String,
    },
    createdBy: {
        accountId: {
            required: true,
            type: String,
        },
        username: {
            required: true,
            type: String,
        }
    },
    likes: {
        required: true,
        type: Number,
    },
}, { timestamps: true, collection: 'Posts' });

export default mongoose.model<Post>('Post', postSchema);