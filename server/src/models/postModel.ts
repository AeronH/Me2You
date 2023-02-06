import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
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

export default mongoose.model('Post', postSchema);