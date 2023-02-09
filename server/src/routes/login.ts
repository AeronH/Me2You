import jwt from 'jsonwebtoken';
import express from 'express';
import accountModel from '../models/accountModel';

export async function login(req: express.Request, res: express.Response) {
    const { username, password } = req.body;

    const account = await accountModel.findOne({ username });

    if (account) {
        if (account.password !== password) {
            return res.status(403).json({ error: "invalid login"});
        }

        const token = jwt.sign(account, 'abc123', { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
        });

        return res.status(200).json(username);
    }

    return res.status(403).json({ error: "invalid login"});
}