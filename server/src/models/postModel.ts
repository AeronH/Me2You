import mongoose, { Schema } from 'mongoose';
import Post from '../types/types';

const postSchema: Schema = new mongoose.Schema(
    {
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
            },
        },
        likes: {
            required: true,
            type: Number,
            default: 0,
        },
    },
    { timestamps: true, collection: 'Posts' }
);

postSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

export default mongoose.model<Post>('Post', postSchema);
