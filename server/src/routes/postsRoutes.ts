import express from 'express';
import PostsController from '../controllers/posts.controller';
import authTokenMiddleware from '../middleware/authToken.middleware';

const postsRouter = express.Router();

// creates a new post
postsRouter.post(
    '/',
    authTokenMiddleware.validateToken,
    PostsController.createPost
);

// Gets all of the posts.
postsRouter.get('/all', PostsController.getAllPostIds);

// Gets all the posts of an account
postsRouter.get('/accountPosts', PostsController.getAllPostsForUser);

postsRouter.put(
    '/like',
    authTokenMiddleware.validateToken,
    PostsController.likePost
);

postsRouter.get(
    '/isLiked/:id',
    authTokenMiddleware.validateToken,
    PostsController.isPostLiked
);

// Gets a single post by the post id, these two need to be at the bottom due to how routes work.
postsRouter.get('/:id', PostsController.getSinglePost);

// deletes a post by the posts id
postsRouter.delete(
    '/:id',
    authTokenMiddleware.validateToken,
    PostsController.deletePost
);

export default postsRouter;
