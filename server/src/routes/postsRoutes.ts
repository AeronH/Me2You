import express from 'express';

const postsRouter = express.Router();

// Gets all of the posts.
postsRouter.get('/api/posts/all', (req, res) => {
    res.json('Get all posts');
});

// Gets a single post by the post id
postsRouter.get('/api/posts/:id', (req, res) => {
    res.json(`getting the info for post with the id ${req.params.id}`);
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
    res.json('Create a new post');
    // postsController logic
});

export default postsRouter;