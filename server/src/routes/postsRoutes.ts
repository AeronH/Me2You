import express from 'express';
import postModel from '../models/postModel';
import uniqid from 'uniqid';
import Post from '../utils/types';

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
postsRouter.get('/all', async (req, res) => {
    try {
        const data = await postModel.find();
        res.status(200).json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Gets a single post by the post id
postsRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await postModel.findById(id);
        res.status(200).json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
    // postsController logic
});

// Gets all the posts of an account
postsRouter.get('/:account_id', (req, res) => {
    // postsController logic
});

// deletes a post by the posts id
postsRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await postModel.findByIdAndDelete(id);
        res.status(200).send(`Post with the id ${data} deleted`);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export default postsRouter;