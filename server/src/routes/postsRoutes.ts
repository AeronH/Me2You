import express from 'express';
import postsController from '../controllers/posts.controller';

const postsRouter = express.Router();

// creates a new post
postsRouter.post('/', postsController.createPost);

// Gets all of the posts.
postsRouter.get('/all', postsController.getAllPosts);

// Gets all the posts of an account
postsRouter.get('/accountPosts', postsController.getAllPostsForUser);

postsRouter.put('/like', postsController.likePost);

// Gets a single post by the post id, these two need to be at the bottom due to how routes work.
postsRouter.get('/:id', postsController.getSinglePost);

// deletes a post by the posts id
postsRouter.delete('/:id', postsController.deletePost);


export default postsRouter;