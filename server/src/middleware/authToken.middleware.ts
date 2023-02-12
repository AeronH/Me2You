import express from 'express';
import jwt from 'jsonwebtoken';

async function validateToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    const token = req.cookies.token;

    if (!token) {
       return res.status(401).json({ message: 'Auth Token not present'});
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET as string);
        // req.User = user;
        next();
    } catch (error) {
        res.clearCookie('token').json({ message: 'Auth Token not validated!'});
    }
}   

export default { validateToken }