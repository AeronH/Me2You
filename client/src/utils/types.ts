export interface Post {
    bodyText: string;
    createdAt: string;
    createdBy: {
        accountId: string;
        username: string;
    }
    id: string;
    likes: number;
    updatedAt: string;
}