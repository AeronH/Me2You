import express from 'express';
import postModel from '../models/postModel';
import uniqid from 'uniqid';

const postsRouter = express.Router();

// creates a new post
postsRouter.post('/', async (req, res) => {
    const post = new postModel({
        bodyText: req.body.bodyText,
        createdBy: {
            accountId: uniqid(),
            username: req.body.username,
        },
        likes: 0
    });

    try {
        const dataToSave = await post.save();
        res.status(200).json(dataToSave);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Gets all of the posts.
postsRouter.get('/all', (req, res) => {
    res.json('Get all posts');
});

// Gets a single post by the post id
postsRouter.get('/:id', (req, res) => {
    res.json(`getting the info for post with the id ${req.params.id}`);
    // postsController logic
});

// Gets all the posts of an account
postsRouter.get('/:account_id', (req, res) => {
    // postsController logic
});

// deletes a post by the posts id
postsRouter.delete('/:id', (req, res) => {
    // postsController logic
});

export default postsRouter;