import jwt from 'jsonwebtoken';
import express from 'express';
import accountModel from '../models/accountModel';
import Account from '../utils/types';

export async function login(req: express.Request, res: express.Response) {
    const { username, password } = req.body;

    const account = await accountModel.find({ username });

    if (account[1].password !== password) {
        return res.status(403).json({ error: "invalid login"});
    }

    const token = jwt.sign(account, 'abc123', { expiresIn: "1h" });

    res.cookie("token", token, {
        httpOnly: true,
    });

    return res.status(200).json(username);
}