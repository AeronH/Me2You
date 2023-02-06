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
    }
}, { timestamps: true, collection: 'Accounts' });

export default mongoose.model('Account', accountSchema);