import express from 'express';
import accountsController from '../controllers/accounts.controller';

const accountsRouter = express.Router();

// gets a list of all the accounts and their basic info
accountsRouter.get('/all', accountsController.getAllAccounts);

// gets the indepth info for a single account
accountsRouter.get('/:account_id', (req, res) => {
    // accountsController logic
});

// creates a new user
accountsRouter.post('/create', accountsController.createNewAccount);

// deletes an account
accountsRouter.delete('/:account_id', (req, res) => {
    // accountsController logic
});

export default accountsRouter;