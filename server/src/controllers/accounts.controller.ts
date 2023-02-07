import express from "express";
import accountModel from "../models/accountModel";

// returns all the current registered accounts
async function getAllAccounts(req: express.Request, res: express.Response) {
    try {
        const data = await accountModel.find();
        res.status(200).json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

// creates a new account
async function createNewAccount(req: express.Request, res: express.Response) {
    const username = req.body.username;
    const bio = req.body.bio;
    const avatarImage = req.body.avatarImage || null;
    const account = new accountModel({ username, bio, avatarImage });

    try {
        await account.save();
        res.status(200).send(`The user ${username} has been created.`);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export default { getAllAccounts, createNewAccount }
