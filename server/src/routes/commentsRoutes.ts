import express from 'express';
import CommentsController from '../controllers/comments.controller';

const commentsRouter = express.Router();

// Get all comments for a post
commentsRouter.get('/', CommentsController.getAllComments);

commentsRouter.post('/', CommentsController.saveComment);

commentsRouter.put('/', CommentsController.likeComment);

export default commentsRouter;
