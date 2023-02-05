import express from 'express';

const accountsRouter = express.Router();

// gets a list of all the accounts and their basic info
accountsRouter.get('/api/accounts', (req, res) => {
    res.json('Get all registered Accounts');
    // accountsController logic
});

// gets the indepth info for a single account
accountsRouter.get('/api/accounts/:account_id', (req, res) => {
    // accountsController logic
});

// creates a new user
accountsRouter.post('/api/accounts', (req, res) => {
    // accountsController logic
});

// deletes an account
accountsRouter.delete('/api/accounts/:account_id', (req, res) => {
    // accountsController logic
});

export default accountsRouter;