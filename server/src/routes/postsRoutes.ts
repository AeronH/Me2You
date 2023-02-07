import express from 'express';
import postsController from '../controllers/posts.controller';

const postsRouter = express.Router();

// creates a new post
postsRouter.post('/', postsController.createPost);

// Gets all of the posts.
postsRouter.get('/all', postsController.getAllPosts);

// Gets a single post by the post id
postsRouter.get('/:id', postsController.getSinglePost);

// Gets all the posts of an account
postsRouter.get('/:account_id', );

// deletes a post by the posts id
postsRouter.delete('/:id', postsController.deletePost);

postsRouter.put('/like', postsController.likePost);

export default postsRouter;