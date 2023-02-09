import express from "express";
import accountModel from "../models/accountModel";

// returns all the current registered accounts
async function getAllAccounts(req: express.Request, res: express.Response, next: express.NextFunction) {
    const data = await accountModel.find().catch(next);
    res.status(200).json(data);
}

// creates a new account
async function createNewAccount(req: express.Request, res: express.Response, next: express.NextFunction) {
    const username = req.body.username;
    const password = req.body.password;
    const bio = req.body.bio;
    const avatarImage = req.body.avatarImage || null;
    const account = new accountModel({ username, password, bio, avatarImage });

    await account.save().catch(next);
    res.status(200).send(`The user ${username} has been created.`);
}

export default { getAllAccounts, createNewAccount }
