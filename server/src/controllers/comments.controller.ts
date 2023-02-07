import express from 'express';
import commentModel from '../models/commentModel';
import uniqid from 'uniqid';

// gets all the comments for a post
async function getAllComments(req: express.Request, res: express.Response) {
    try {
        const postId = req.body.postId;
        const data = await commentModel.find({ postId });
        res.status(200).json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

// creates a comment for a post by id
async function saveComment(req: express.Request, res: express.Response) {
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

    try {
        await comment.save();
        res.status(200).send(`Comment saved to post ${postId}`);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

// updates the 'likes' value of a comment (Increments by 1)
async function likeComment(req: express.Request, res: express.Response) {
    const commentId = req.body.commentId;
     try {
        await commentModel.findByIdAndUpdate(commentId, {$inc : { 'likes' : 1 }});
        res.status(200).send(`Successfully liked post with id ${commentId}`);
     } catch (error: any) {
        res.status(400).json({ message: error.message });
     }
}

export default { getAllComments, saveComment, likeComment }