import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction} from 'express';
import accountModel from '../models/accountModel';
import authTokenService from '../services/authToken.service'
import bcrypt from 'bcryptjs'

export async function login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    const existingUser = await accountModel.findOne({ username }).catch(next);

    if (!existingUser || !await bcrypt.compare(password, existingUser.password).catch(next)) {
        const error = new Error("Invalid Login Credentials")
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

    await accountModel.findByIdAndUpdate(existingUser.id, { refreshToken });   

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
        message: `Login with user '${username}' successful`,
        accessToken
    });
}

// Clear header user on logout
export async function logout(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    if (accessToken) {
        jwt.sign(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET as string, { expiresIn: 1 }, (logout, error) => {
            if (logout) {
                res.status(200).clearCookie('accessToken').json({ message: 'successfully logged out.'})
            } else {
                next(error);
            }
        })
    } else {
        const error = new Error('There is no user currently logged in.');
        next(error);
    }
}

export async function signUp(req: Request, res: Response, next: NextFunction) {
    const { username, password, confirmPassword } = req.body;

    const existingUser = await accountModel.findOne({ username }).catch(next);

    if(existingUser) {
        const error = new Error("Username already exists, please try again!");
        return next(error);
    }

    if(password !== confirmPassword) {
        const error = new Error("Password's do not match, please try again!");
        return next(error);
    }

    const encryptedPassword = await bcrypt.hash(password, 10).catch(next);

    const newUser = new accountModel({ 
        username, 
        password: encryptedPassword,
     });
     
    await newUser.save().catch(next);

    const accessToken = authTokenService.generateAccessToken({ 
        username: newUser.username,
        accountId: newUser.id,
     });

    const refreshToken = authTokenService.generateRefreshToken({
        username: newUser.username,
        accountId: newUser.id,
    });

    await accountModel.findByIdAndUpdate(newUser.id, { refreshToken }).catch(next);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ 
        message: 'Successfully created account!',
        accessToken,
    });
}

export default { login, logout, signUp }