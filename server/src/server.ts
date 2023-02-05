import express from 'express';
import bodyParser from 'body-parser'
import mainRouter from './routes/routes';

const app = express();
// const port = process.env.PORT || 3080;

app.use(bodyParser.json());
app.use(mainRouter);

app.listen(3080, () => {
    console.log(`Server listening on port ${3080}`);
});

