import { Request, Response, NextFunction } from 'express';


async function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if (!error.statusCode) error.statusCode = 500;

    if (error.statusCode === 302) {
        return res.status(302).redirect('/submit');
    } 

    return res.status(error.statusCode).json({ error: error.message });
}

export default { errorHandler };
