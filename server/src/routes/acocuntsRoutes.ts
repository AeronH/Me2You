import express from 'express';
import accountModel from '../models/accountModel';

const accountsRouter = express.Router();

// gets a list of all the accounts and their basic info
accountsRouter.get('/', (req, res) => {
    res.json('Get all registered Accounts');
    // accountsController logic
});

// gets the indepth info for a single account
accountsRouter.get('/:account_id', (req, res) => {
    // accountsController logic
});

// creates a new user
accountsRouter.post('/', async (req, res) => {
    const user = new accountModel({
        username: req.body.username,
        bio: req.body.bio,
        avatarImage: req.body.avatarImage || null,
    });

    try {
        const dataToSave = await user.save();
        res.status(200).json(dataToSave);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// deletes an account
accountsRouter.delete('/:account_id', (req, res) => {
    // accountsController logic
});

export default accountsRouter;