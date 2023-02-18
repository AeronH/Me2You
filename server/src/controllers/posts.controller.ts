import { Request, Response, NextFunction} from 'express';
import accountModel from '../models/accountModel';
import postModel from '../models/postModel';

// Creates and adds a Post to the mongoDb Posts Collection
async function createPost(req: Request, res: Response, next: NextFunction) {
    const post = new postModel({
        bodyText: req.body.bodyText,
        createdBy: {
            accountId: req.user.accountId,
            username: req.user.username,
        },
    });

    try {
        const dataToSave = await post.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        next(error);
    }

}

// Gets all posts from the mongodB Posts Collection
async function getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await postModel.find();
        res.status(200).json({
            message: 'successfully retrieved all posts',
            data: data,
        });
    } catch (error) {
        next(error);
    }
 
}

// Gets all the posts of a user 
async function getAllPostsForUser(req: Request, res: Response, next: NextFunction) {
    const accountId = req.body.accountId;
    
    try {
        const posts = await postModel.find({ 'createdBy.accountId': accountId });
        
        res.status(200).json({ 
            message: `Successfully got posts of user with id ${accountId}`,
            data: posts,
        });
    } catch (error) {        
        next(error);
    }
}

// gets a single post by the postId
async function getSinglePost(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
        const data = await postModel.findById(id);   
        console.log(data, 'single post');
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(204).json({ message: `post with the id ${id} not found.`});
        }
    } catch (error) {
        next(error);
    }
}

// deletes a post by the postId
async function deletePost(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
        const deletedPost = await postModel.findByIdAndDelete(id);
        console.log(deletedPost);
        if (deletedPost) {
            res.status(200).send(`Successfully deleted the post with the id ${id}`)
        } else {
            res.status(204).send(`Could not delete post with the id, ${id}`)
        }
    } catch (error) {
        next(error);
    }
}

// updates the likes of a post (Increments by 1)
async function likePost(req: Request, res: Response, next: NextFunction) {
    const postId = req.body.postId;
    const userId = req.user.accountId;

    try {
        const user = await accountModel.findById(userId);
        const usersLikedPosts = user?.likedPosts;
        const postCurrentlyLiked = usersLikedPosts?.includes(postId);

        // Dislikes post and removes from users likedPosts if post is already liked
        if (postCurrentlyLiked) {
            await postModel.findByIdAndUpdate(postId, { $inc : { likes: -1 }});

            const newLikedPosts = usersLikedPosts;
            newLikedPosts?.splice(newLikedPosts.indexOf(postId), 1);

            await accountModel.findByIdAndUpdate(userId, { likedPosts: newLikedPosts });

        // Liked post and adds post to users likedPosts if post isn't already liked
        } else {
            await postModel.findByIdAndUpdate(postId, { $inc: { likes: 1 }});

            const newLikedPosts = usersLikedPosts;
            newLikedPosts?.push(postId);

            await accountModel.findByIdAndUpdate(userId, { likedPosts: newLikedPosts });
        }

        res.status(200).send(`Successfully ${postCurrentlyLiked ? 'disliked' : 'liked'} post with id ${postId}`);
    } catch (error) {
        next(error);
    }
}

export default { createPost, getAllPosts, getAllPostsForUser, getSinglePost, deletePost, likePost }