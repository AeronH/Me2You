import express from 'express';
import accountsRouter from "./accountsRoutes";
import postsRouter from "./postsRoutes";
import commentsRouter from './commentsRoutes';

const mainRouter = express.Router();

mainRouter.use('/accounts', accountsRouter);
mainRouter.use('/posts', postsRouter);
mainRouter.use('/comments', commentsRouter);

export default mainRouter;

