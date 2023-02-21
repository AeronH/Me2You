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

    async refreshToken(req: Request, res: Response, next: NextFunction) {
        const refreshToken = req.cookies?.refresh;

        if (refreshToken) {
            jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_TOKEN_SECRET as string,
                (err: any, decoded: any) => {
                    if (err) {
                        return res
                            .status(406)
                            .json({ message: 'unauthorized access' });
                    } else {
                        const accessToken =
                            authTokenService.generateAccessToken({
                                username: decoded.username,
                                accountId: decoded.accountID,
                            });
                        return res.json({ accessToken });
                    }
                }
            );
        } else {
            return res.status(406).json({ message: 'unauthorized access' });
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
                            .clearCookie('refreshToken')
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

            res.status(200).json({
                message: `Successfully created the account ${username}!`,
            });
        } catch (error) {
            next(error);
        }
    }

    async getCurrentUserDetails(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const currentUserId = req.user.accountId;
        try {
            const currentUser = await accountModel.findById(currentUserId);
            if (currentUser) {
                res.status(200).json({
                    username: currentUser.username,
                    bio: currentUser.bio,
                    avatarImage: currentUser.avatarImage,
                    accountId: currentUser.id,
                    likedPosts: currentUser.likedPosts,
                });
            } else {
                res.status(401).json({ message: 'User not found' });
            }
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
