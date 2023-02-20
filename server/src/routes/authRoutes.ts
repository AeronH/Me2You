import express from 'express';
import AuthController from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.post('/login', AuthController.login);

authRouter.post('/logout', AuthController.logout);

authRouter.post('/signUp', AuthController.signUp);

export default authRouter;
