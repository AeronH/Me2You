import express from 'express';
import { connectToMongoDB } from './utils/db';
import bodyParser from 'body-parser'
import mainRouter from './routes/routes';

const app = express();
const port = process.env.PORT || 3080;

function startServer() {
    connectToMongoDB();

    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api/' ,mainRouter);
    
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

startServer();