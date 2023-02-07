import express from 'express';
import postModel from '../models/postModel';
import { createPost, deletePostById, getAllPosts, getSinglePost } from '../controllers/postsController';

const postsRouter = express.Router();

// creates a new post
postsRouter.post('/', createPost);

// Gets all of the posts.
postsRouter.get('/all', getAllPosts);

// Gets a single post by the post id
postsRouter.get('/:id', getSinglePost);

// Gets all the posts of an account
postsRouter.get('/:account_id', (req, res) => {
    // postsController logic
});

// deletes a post by the posts id
postsRouter.delete('/:id', deletePostById);

export default postsRouter;