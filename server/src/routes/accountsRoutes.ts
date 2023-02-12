import express from 'express';
import accountsController from '../controllers/accounts.controller';

const accountsRouter = express.Router();

// gets a list of all the accounts and their basic info
accountsRouter.get('/all', accountsController.getAllAccounts);

// gets the indepth info for a single account
accountsRouter.get('/single', accountsController.getSingleAccount);

export default accountsRouter;