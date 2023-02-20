import express from 'express';
import AccountsController from '../controllers/accounts.controller';

const accountsRouter = express.Router();

// gets a list of all the accounts and their basic info
accountsRouter.get('/all', AccountsController.getAllAccounts);

// gets the indepth info for a single account
accountsRouter.get('/single', AccountsController.getSingleAccount);

export default accountsRouter;
