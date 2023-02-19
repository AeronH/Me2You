import { Document } from 'mongoose';
import { Request } from 'express';

declare global {
    namespace Express {
        export interface Request {
            user: any;
        }
        export interface Response {
            user: any;
        }
    }
}

export default interface Post {
    bodyText: string;
    createdBy: {
        accountId: string;
        username: string;
    };
    likes: number;
}

export default interface Account {
    username: string;
    bio: string;
    avatarImage: string;
    password: string;
}

export default interface IGetUserAuthInfoRequest extends Request {
    user?: {
        username?: string;
        accountId?: string;
    };
}
