import express from 'express';
import commentModel from '../models/commentModel';
import uniqid from 'uniqid';

// gets all the comments for a post
async function getAllComments(req: express.Request, res: express.Response, next: express.NextFunction) {
    const postId = req.body.postId;

    const data = await commentModel.find({ postId }).catch(next);
    res.status(200).json(data);
}

// creates a comment for a post by id
async function saveComment(req: express.Request, res: express.Response, next: express.NextFunction) {
    const postId = req.body.postId;
    const commentBody = req.body.commentBody;
    const username = req.body.username;

    const comment = new commentModel({
        commentBody: commentBody,
        createdBy: {
            accountId: uniqid(),
            username: username,
        },
        likes: 0,
        postId: postId,
    });

    await comment.save().catch(next);
    res.status(200).send(`Comment saved to post ${postId}`);
}

// updates the 'likes' value of a comment (Increments by 1)
async function likeComment(req: express.Request, res: express.Response, next: express.NextFunction) {
    const commentId = req.body.commentId;
 
    await commentModel.findByIdAndUpdate(commentId, {$inc : { 'likes' : 1 }}).catch(next);
    res.status(200).send(`Successfully liked post with id ${commentId}`);
}

export default { getAllComments, saveComment, likeComment }