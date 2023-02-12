import express from "express";
import accountModel from "../models/accountModel";

// returns all the current registered accounts
async function getAllAccounts(req: express.Request, res: express.Response, next: express.NextFunction) {
    const data = await accountModel.find().catch(next);
    res.status(200).json({
        message: 'Getting all accounts',
        data: {
            users: data,
        }
    });
}

async function getSingleAccount(req: express.Request, res: express.Response, next: express.NextFunction) {
    const id = req.body.account_id;
    const account = await accountModel.findById(id).catch(next);
    res.status(200).json({
        message: `Successfuly returned account '${id}'`,
        data: {
            username: account?.username,
            id: account?.id,
            avatarImage: account?.avatarImage,
            bio: account?.bio,
        },
    });
}

export default { getAllAccounts, getSingleAccount }
