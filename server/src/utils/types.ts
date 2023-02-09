import { Document } from "mongoose"

export default interface Post {
    bodyText: string,
    createdBy: {
        accountId: string,
        username: string,
    }
    likes: number,
}

export default interface Account {
    username: string,
    bio: string,
    avatarImage: string,
    password: string,
}
