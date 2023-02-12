import jwt from 'jsonwebtoken';
import express from 'express';
import accountModel from '../models/accountModel';
import { generateToken } from '../utils/authToken'

export async function login(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { username, password } = req.body;

    const existingUser = await accountModel.findOne({ username }).catch(next);


    if (!existingUser || existingUser.password !== password) {
        const error = new Error("Invalid Login Credentials")
        return next(error);
    }

    const token = generateToken({ 
        username: existingUser.username,
        accountId: existingUser.id,
     });

    res.cookie("token", token, {
        httpOnly: true,
    });

    res.status(200).json({
        message: 'Login Successful',
        data: { username, password }
    });
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

    const newUser = new accountModel({ username, password });
    await newUser.save().catch(next);

    const token = generateToken({ 
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

export default { login, signUp }