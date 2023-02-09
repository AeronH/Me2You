// import { config } from 'dotenv';
import express from 'express';
import { connectToMongoDB } from './utils/db';
import bodyParser from 'body-parser'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mainRouter from './routes/routes';
import path from 'path';
import { config } from 'dotenv'
import errorMiddleware from './middleware/error.middleware';
import { login } from './routes/login';

config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const port = process.env.PORT;

function startServer() {
    connectToMongoDB();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors({ origin: '*' }))
    app.use(cookieParser());

    app.get('/login', login);

    app.use('/api/' ,mainRouter);

    app.use('*', (req: express.Request, res: express.Response) => {
        res.status(301).redirect('/not-found');
    })

    app.use(errorMiddleware.errorHandler);
    
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

startServer(); 