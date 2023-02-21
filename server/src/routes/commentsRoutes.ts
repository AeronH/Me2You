import express from 'express';
import CommentsController from '../controllers/comments.controller';
import authTokenMiddleware from '../middleware/authToken.middleware';

const commentsRouter = express.Router();

// Get all comments for a post
commentsRouter.get('/', CommentsController.getAllComments);

commentsRouter.post(
    '/',
    authTokenMiddleware.validateToken,
    CommentsController.saveComment
);

commentsRouter.put(
    '/',
    authTokenMiddleware.validateToken,
    CommentsController.likeComment
);

export default commentsRouter;
