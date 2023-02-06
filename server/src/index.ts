// import { config } from 'dotenv';
import express from 'express';
import { connectToMongoDB } from './utils/db';
import bodyParser from 'body-parser'
import mainRouter from './routes/routes';
import path from 'path';
import { config } from 'dotenv'

config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const port = process.env.PORT;

function startServer() {
    connectToMongoDB();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api/' ,mainRouter);
    
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

startServer(); 