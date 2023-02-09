import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    username: {
        required: true, 
        type: String,
    },
    bio: {
        required: false,
        type: String,
    },
    avatarImage: {
        required: false,
        type: String,
    },
    password: {
        required: true,
        type: String,
    }
}, { timestamps: true, collection: 'Accounts' });

accountSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
  });

export default mongoose.model('Account', accountSchema);