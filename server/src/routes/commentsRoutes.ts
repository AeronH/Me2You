import express from 'express';
import commentsController from '../controllers/comments.controller';

const commentsRouter = express.Router();

// Get all comments for a post
commentsRouter.get('/', commentsController.getAllComments);

commentsRouter.post('/', commentsController.saveComment);

commentsRouter.put('/', commentsController.likeComment);

export default commentsRouter;