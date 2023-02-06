import mongoose, { Schema } from 'mongoose';
import Account from '../utils/types'

const accountSchema: Schema = new mongoose.Schema({
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

export default mongoose.model<Account>('Account', accountSchema);