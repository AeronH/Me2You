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

export default { getAllAccounts }
