import jwt from 'jsonwebtoken';
import express from 'express';
import accountModel from '../models/accountModel';
import authTokenService from '../services/authToken.service'
import bcrypt from 'bcryptjs'

export async function login(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { username, password } = req.body;

    const existingUser = await accountModel.findOne({ username }).catch(next);

    if (!existingUser || !await bcrypt.compare(password, existingUser.password).catch(next)) {
        const error = new Error("Invalid Login Credentials")
        return next(error);
    }

    const token = authTokenService.generateToken({ 
        username: existingUser.username,
        accountId: existingUser.id,
     });

    res.cookie("token", token, {
        httpOnly: true,
    });    

    res.status(200).json({
        message: `Login with user '${username}' successful`,
    });
}

// Currently clears the cookie jwt token.
export async function logout(req:express.Request, res:express.Response, next: express.NextFunction) {
    const token = req.cookies['token'];
    if (token) {
        jwt.sign(token, process.env.JWT_SECRET as string, { expiresIn: 1 }, (logout, error) => {
            if (logout) {
                res.status(200).clearCookie('token').json({ message: 'successfully logged out.'})
            } else {
                next(error);
            }
        })
    } else {
        const error = new Error('There is no user currently logged in.');
        next(error);
    }
}

export async function signUp(req: express.Request, res: express.Response, next: express.NextFunction) {
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

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = new accountModel({ 
        username, 
        password: encryptedPassword,
        bio: null,
        avatarImage: null,
     });
    await newUser.save().catch(next);

    const token = authTokenService.generateToken({ 
        username: newUser.username,
        accountId: newUser.id,
     });

    res.cookie("token", token, {
        httpOnly: true,
    });

    res.status(200).json({ 
        message: 'Successfully created account!',
        data: { newUser },
    });
}

export default { login, logout, signUp }