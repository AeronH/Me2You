import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    commentBody: {
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
    postId: {
        required: true,
        type: String,
    }
}, { timestamps: true, collection: 'Comments' });

commentSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
  });

export default mongoose.model('Comment', commentSchema);