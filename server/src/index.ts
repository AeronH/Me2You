// import { config } from 'dotenv';
import express from 'express';
import dbService from './services/db.service';
import bodyParser from 'body-parser'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mainRouter from './routes/routes';
import path from 'path';
import { config } from 'dotenv'
import errorMiddleware from './middleware/error.middleware';
import authTokenMiddleware from './middleware/authToken.middleware'
import authRouter from './routes/authRoutes';

config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const port = process.env.PORT;

function startServer() {
    dbService.connectToMongoDB();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors({ origin: '*' }))
    app.use(cookieParser());

    app.use('/auth/', authRouter);

    app.use('/api/', authTokenMiddleware.validateToken, mainRouter);

    app.use('*', (req: express.Request, res: express.Response) => {
        res.status(301).redirect('/not-found');
    })

    app.use(errorMiddleware.errorHandler);
    
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

startServer(); 