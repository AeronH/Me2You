import express from 'express';
import accountsRouter from "./accountsRoutes";
import postsRouter from "./postsRoutes";

const mainRouter = express.Router();

mainRouter.use('/accounts', accountsRouter);
mainRouter.use('/posts', postsRouter);

export default mainRouter;

