import express from 'express';
import AuthController from '../controllers/auth.controller';
import authTokenMiddleware from '../middleware/authToken.middleware';

const authRouter = express.Router();

authRouter.post('/login', AuthController.login);

authRouter.post('/refresh', AuthController.refreshToken);

authRouter.post('/logout', AuthController.logout);

authRouter.post('/signUp', AuthController.signUp);

authRouter.get(
    '/currentUser',
    authTokenMiddleware.validateToken,
    AuthController.getCurrentUserDetails
);

export default authRouter;
