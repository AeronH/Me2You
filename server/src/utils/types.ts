import { Document } from "mongoose"

export default interface Post extends Document {
    bodyText: string,
    createdBy: {
        accountId: string,
        username: string,
    }
    likes: number,
}

export default interface Account extends Document {
    username: string,
    bio: string,
    avatarImage: string
}

