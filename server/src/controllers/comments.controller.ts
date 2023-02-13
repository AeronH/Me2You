import { Request, Response, NextFunction} from 'express';
import commentModel from '../models/commentModel';

// gets all the comments for a post
async function getAllComments(req: Request, res: Response, next: NextFunction) {
    const postId = req.body.postId;

    const data = await commentModel.find({ postId }).catch(next);
    res.status(200).json(data);
}

// creates a comment for a post by id
async function saveComment(req: Request, res: Response, next: NextFunction) {
    const postId = req.body.postId;
    const commentBody = req.body.commentBody;

    const comment = new commentModel({
        commentBody: commentBody,
        createdBy: {
            accountId: req.user.accountId,
            username: req.user.username,
        },
        postId: postId,
    });

    await comment.save().catch(next);
    res.status(200).send(`Comment saved to post ${postId}`);
}

// updates the 'likes' value of a comment (Increments by 1)
async function likeComment(req: Request, res: Response, next: NextFunction) {
    const commentId = req.body.commentId;
 
    await commentModel.findByIdAndUpdate(commentId, {$inc : { 'likes' : 1 }}).catch(next);
    res.status(200).send(`Successfully liked post with id ${commentId}`);
}

export default { getAllComments, saveComment, likeComment }