import express from 'express';

const postsRouter = express.router();

// Gets all of the posts.
postsRouter.get('/api/posts', (req, res) => {
    // postsController logic
});

// Gets a single post by the post id
postsRouter.get('/api/posts/:id', (req, res) => {
    // postsController logic
});

// Gets all the posts of an account
postsRouter.get('/api/posts/:account_id', (req, res) => {
    // postsController logic
});

// deletes a post by the posts id
postsRouter.delete('/api/posts/:id', (req, res) => {
    // postsController logic
});

// creates a new post
postsRouter.post('/api/posts', (req, res) => {
    // postsController logic
});

export default postsRouter;