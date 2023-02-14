import { Request, Response, NextFunction} from "express";
import accountModel from "../models/accountModel";

// returns all the current registered accounts
async function getAllAccounts(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await accountModel.find();
        res.status(200).json({
            message: 'Getting all accounts',
            data: {
                users: data,
            }
        });
    } catch (error) {
        next(error);
    }
   
}

async function getSingleAccount(req: Request, res: Response, next: NextFunction) {
    const id = req.body.account_id;

    try {
        const account = await accountModel.findById(id);
        res.status(200).json({
            message: `Successfuly returned account '${id}'`,
            data: {
                username: account?.username,
                id: account?.id,
                avatarImage: account?.avatarImage,
                bio: account?.bio,
            },
        });
    } catch (error) {
        next(error);
    }
    
}

export default { getAllAccounts, getSingleAccount }
