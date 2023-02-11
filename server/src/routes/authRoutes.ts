import express from 'express'
import authController from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.post('/login', authController.login);

authRouter.post('/signUp', authController.signUp);

export default authRouter