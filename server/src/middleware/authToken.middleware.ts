import express from 'express';
import jwt from 'jsonwebtoken';

async function validateToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    const token = req.cookies.token;

    if (!token) {
        const error = new Error('Auth Token not provided!');
        next(error);
    }

    try {
        const user = jwt.verify(token, 'abc123');
        // req.User = user;
        next();
    } catch (error) {
        res.clearCookie('token');
        const authError = new Error('Auth Token not validated!');
        next(authError)
    }
}   

export default { validateToken }