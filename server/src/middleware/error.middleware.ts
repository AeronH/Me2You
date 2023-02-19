import { Request, Response, NextFunction } from 'express';

async function errorHandler(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!error.statusCode) error.statusCode = 500;

    if (error.statusCode === 302) {
        res.status(302).redirect('/submit');
    } else {
        res.status(error.statusCode).json({ message: error.message });
    }
}

export default { errorHandler };
