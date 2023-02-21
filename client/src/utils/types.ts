export interface User {
    username: string;
    bio: string | null;
    avatarImage: string | null;
    accountId: number;
    likedPosts: string[];
}

export interface Post {
    bodyText: string;
    createdAt: string;
    createdBy: {
        accountId: string;
        username: string;
    };
    id: string;
    likes: number;
    updatedAt: string;
}
