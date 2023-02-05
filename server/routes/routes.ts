import express from 'express';
import accountsRouter from "./acocuntsRoutes";
import postsRouter from "./postsRoutes";

const mainRouter = express.router();

mainRouter.use(accountsRouter);
mainRouter.use(postsRouter);

export default mainRouter;

