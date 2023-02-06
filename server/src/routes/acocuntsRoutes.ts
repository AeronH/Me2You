import express from 'express';
import accountModel from '../models/accountModel';

const accountsRouter = express.Router();

// gets a list of all the accounts and their basic info
accountsRouter.get('/all', async (req, res) => {
    try {
        const data = await accountModel.find();
        res.status(200).json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// gets the indepth info for a single account
accountsRouter.get('/:account_id', (req, res) => {
    // accountsController logic
});

// creates a new user
accountsRouter.post('/create', async (req, res) => {
    const username = req.body.username;
    const bio = req.body.bio;
    const avatarImage = req.body.avatarImage || null;

    const user = new accountModel({ username, bio, avatarImage });

    try {
        const dataToSave = await user.save();
        res.status(200).json(`Created the user: ${username}`);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// deletes an account
accountsRouter.delete('/:account_id', (req, res) => {
    // accountsController logic
});

export default accountsRouter;