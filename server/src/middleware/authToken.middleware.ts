import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    accountId: string,
    username: string;
}

async function validateToken(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    
    if (!accessToken) {
       return res.status(401).json({ message: 'Access Token not present'});
    }

    try {
        const { username, accountId } = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET as string) as JwtPayload;
        req.user = { username, accountId };
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Access Token not validated.'});
    }
}   

export default { validateToken }