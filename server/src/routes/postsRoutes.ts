import express from 'express';
import PostsController from '../controllers/posts.controller';

const postsRouter = express.Router();

// creates a new post
postsRouter.post('/', PostsController.createPost);

// Gets all of the posts.
postsRouter.get('/all', PostsController.getAllPosts);

// Gets all the posts of an account
postsRouter.get('/accountPosts', PostsController.getAllPostsForUser);

postsRouter.put('/like', PostsController.likePost);

// Gets a single post by the post id, these two need to be at the bottom due to how routes work.
postsRouter.get('/:id', PostsController.getSinglePost);

// deletes a post by the posts id
postsRouter.delete('/:id', PostsController.deletePost);

export default postsRouter;
