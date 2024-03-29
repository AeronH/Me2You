import express, { Request, Response } from 'express';
import dbService from './services/db.service';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mainRouter from './routes/routes';
import path from 'path';
import { config } from 'dotenv';
import errorMiddleware from './middleware/error.middleware';
import authRouter from './routes/authRoutes';

config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const port = process.env.PORT;

function startServer() {
    dbService.connectToMongoDB();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors({ origin: '*' }));
    app.use(cookieParser());

    app.use('/auth/', authRouter);

    app.use('/api/', mainRouter);

    app.use('*', (req: Request, res: Response) => {
        res.status(301).redirect('/not-found');
    });

    // ERROR HANDLER MIDDLEWARE, last middleware used
    app.use(errorMiddleware.errorHandler);

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

startServer();
