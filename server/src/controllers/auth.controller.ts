import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import accountModel from '../models/accountModel';
import authTokenService from '../services/authToken.service';
import bcrypt from 'bcryptjs';

class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body;

        try {
            const existingUser = await accountModel.findOne({ username });

            if (
                !existingUser ||
                !(await bcrypt.compare(password, existingUser.password))
            ) {
                const error = new Error('Invalid Login Credentials');
                return next(error);
            }

            const accessToken = authTokenService.generateAccessToken({
                username: existingUser.username,
                accountId: existingUser.id,
            });

            const refreshToken = authTokenService.generateRefreshToken({
                username: existingUser.username,
                accountId: existingUser.id,
            });

            await accountModel.findByIdAndUpdate(existingUser.id, {
                refreshToken,
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });

            res.status(200).json({
                message: `Login with user '${username}' successful`,
                accessToken,
            });
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        const accessToken = req.headers['authorization']?.split(' ')[1];
        if (accessToken) {
            jwt.sign(
                accessToken,
                process.env.JWT_ACCESS_TOKEN_SECRET as string,
                { expiresIn: 1 },
                (logout, error) => {
                    if (logout) {
                        // Redirect to login page on successful logout
                        res.status(200)
                            .clearCookie('accessToken')
                            .json({ message: 'successfully logged out.' });
                    } else {
                        next(error);
                    }
                }
            );
        } else {
            const error = new Error('There is no user currently logged in.');
            next(error);
        }
    }

    async signUp(req: Request, res: Response, next: NextFunction) {
        const { username, password, confirmPassword } = req.body;

        if (!username || !password) {
            const error = new Error(
                'Some input fields are empty, please fill out all fields.'
            );
            return next(error);
        }

        try {
            const existingUser = await accountModel
                .findOne({ username })
                .catch(next);

            if (existingUser) {
                const error = new Error(
                    'Username already exists, please try again!'
                );
                return next(error);
            }

            if (password !== confirmPassword) {
                const error = new Error(
                    "Password's do not match, please try again!"
                );
                return next(error);
            }

            const hashedPassword = await bcrypt.hash(password, 10).catch(next);

            const newUser = new accountModel({
                username,
                password: hashedPassword,
            });

            await newUser.save().catch(next);

            // const accessToken = authTokenService.generateAccessToken({
            //     username: newUser.username,
            //     accountId: newUser.id,
            // });

            // const refreshToken = authTokenService.generateRefreshToken({
            //     username: newUser.username,
            //     accountId: newUser.id,
            // });

            // await accountModel.findByIdAndUpdate(newUser.id, { refreshToken }).catch(next);

            // res.cookie("refreshToken", refreshToken, {
            //     httpOnly: true,
            //     maxAge: 24 * 60 * 60 * 1000,
            // });

            res.status(200).json({
                message: `Successfully created the account ${username}!`,
            });
        } catch (error) {
            next(error);
        }
    }
}

// Clear header user on logout

export default new AuthController();
