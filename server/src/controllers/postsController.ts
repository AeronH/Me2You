import express from 'express';
import postModel from '../models/postModel';
import uniqid from 'uniqid';

// Creates and adds a Post to the mongoDb Posts Collection
export async function createPost(req: express.Request, res: express.Response) {
    const post = new postModel({
        bodyText: req.body.bodyText,
        createdBy: {
            accountId: uniqid(),
            username: req.body.username,
        },
        likes: 0
    });

    try {
        const dataToSave = await post.save();
        res.status(200).json(dataToSave);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

// Gets all posts from the mongodB Posts Collection
export async function getAllPosts(req: express.Request, res: express.Response) {
    try {
        const data = await postModel.find();
        res.status(200).json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function getSinglePost(req: express.Request, res: express.Response) {
    try {
        const id = req.params.id;
        const data = await postModel.findById(id);
        res.status(200).json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function deletePostById(req: express.Request, res: express.Response) {
    try {
        const id = req.params.id;
        await postModel.findByIdAndDelete(id);
        res.status(200).send(`Successfully deleted the post with the id ${id}`)
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}