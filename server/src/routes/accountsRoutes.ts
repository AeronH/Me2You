import express from 'express';
import { createNewAccount, getAllAccounts } from '../controllers/accountsController';
import accountModel from '../models/accountModel';

const accountsRouter = express.Router();

// gets a list of all the accounts and their basic info
accountsRouter.get('/all', getAllAccounts);

// gets the indepth info for a single account
accountsRouter.get('/:account_id', (req, res) => {
    // accountsController logic
});

// creates a new user
accountsRouter.post('/create', createNewAccount);

// deletes an account
accountsRouter.delete('/:account_id', (req, res) => {
    // accountsController logic
});

export default accountsRouter;