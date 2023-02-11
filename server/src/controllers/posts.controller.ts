import express from 'express';
import postModel from '../models/postModel';
import uniqid from 'uniqid';

// Creates and adds a Post to the mongoDb Posts Collection
async function createPost(req: express.Request, res: express.Response, next: express.NextFunction) {
    const post = new postModel({
        bodyText: req.body.bodyText,
        createdBy: {
            accountId: uniqid(),
            username: req.body.username,
        },
        likes: 0
    });

    const dataToSave = await post.save().catch(next);
    res.status(200).json(dataToSave);
}

// Gets all posts from the mongodB Posts Collection
async function getAllPosts(req: express.Request, res: express.Response, next: express.NextFunction) {
    const data = await postModel.find().catch(next);
    res.status(200).json({
        message: 'successfully retrieved all posts',
        data: data,
    });
}

// gets a single post by the postId
async function getSinglePost(req: express.Request, res: express.Response, next: express.NextFunction) {
    const id = req.params.id;
    
    const data = await postModel.findById(id).catch(next);
    res.status(200).json(data);
}

// deletes a post by the postId
async function deletePost(req: express.Request, res: express.Response, next: express.NextFunction) {
    const id = req.params.id;

    await postModel.findByIdAndDelete(id).catch(next);
    res.status(200).send(`Successfully deleted the post with the id ${id}`)
}

// updates the likes of a post (Increments by 1)
async function likePost(req: express.Request, res: express.Response, next: express.NextFunction) {
    const postId = req.body.postId;

    await postModel.findByIdAndUpdate(postId, {$inc : { likes: 1 }}).catch(next);
    res.status(200).send(`Successfully like post with id ${postId}`);
}

export default { createPost, getAllPosts, getSinglePost, deletePost, likePost }