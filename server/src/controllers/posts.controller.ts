import { Request, Response, NextFunction } from 'express';
import accountModel from '../models/accountModel';
import postModel from '../models/postModel';

class PostsController {
    async createPost(req: Request, res: Response, next: NextFunction) {
        const bodyText = req.body.bodyText;
        if (req.user) {
            const post = new postModel({
                bodyText,
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
        } else {
            res.status(400).json({ message: 'You must be logged in to post.' });
        }
    }

    async getAllPostIds(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await postModel.find();
            const postIds = data.map((post) => post.id);
            res.status(200).json({
                message: 'successfully retrieved all posts',
                data: postIds,
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllPostsForUser(req: Request, res: Response, next: NextFunction) {
        const accountId = req.body.accountId;

        try {
            const posts = await postModel.find({
                'createdBy.accountId': accountId,
            });

            res.status(200).json({
                message: `Successfully got posts of user with id ${accountId}`,
                data: posts,
            });
        } catch (error) {
            next(error);
        }
    }

    async getSinglePost(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        try {
            const data = await postModel.findById(id);
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(204).json({
                    message: `post with the id ${id} not found.`,
                });
            }
        } catch (error) {
            next(error);
        }
    }

    async deletePost(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;

        try {
            const deletedPost = await postModel.findByIdAndDelete(id);
            if (deletedPost) {
                res.status(200).send(
                    `Successfully deleted the post with the id ${id}`
                );
            } else {
                res.status(204).send(
                    `Could not delete post with the id, ${id}`
                );
            }
        } catch (error) {
            next(error);
        }
    }

    async likePost(req: Request, res: Response, next: NextFunction) {
        const postId = req.body.postId;
        const userId = req.user.accountId;

        try {
            const user = await accountModel.findById(userId);
            const usersLikedPosts = user?.likedPosts;
            const postCurrentlyLiked = usersLikedPosts?.includes(postId);

            // Dislikes post and removes from users likedPosts if post is already liked
            if (postCurrentlyLiked) {
                await postModel.findByIdAndUpdate(postId, {
                    $inc: { likes: -1 },
                });

                usersLikedPosts?.splice(usersLikedPosts.indexOf(postId), 1);

                await accountModel.findByIdAndUpdate(userId, {
                    likedPosts: usersLikedPosts,
                });

                // Liked post and adds post to users likedPosts if post isn't already liked
            } else {
                await postModel.findByIdAndUpdate(postId, {
                    $inc: { likes: 1 },
                });

                usersLikedPosts?.push(postId);

                await accountModel.findByIdAndUpdate(userId, {
                    likedPosts: usersLikedPosts,
                });
            }

            res.status(200).json({
                message: `Successfully ${
                    postCurrentlyLiked ? 'disliked' : 'liked'
                } post with id ${postId}`,
                likedPosts: usersLikedPosts,
            });
        } catch (error) {
            next(error);
        }
    }

    async isPostLiked(req: Request, res: Response, next: NextFunction) {
        const userId = req.user.accountId;
        const postId = req.params.id;

        try {
            const currentUser = await accountModel.findById(userId);
            if (currentUser) {
                if (currentUser.likedPosts.includes(postId)) {
                    res.status(200).json({ isPostLiked: true });
                } else {
                    res.status(200).json({ isPostLiked: false });
                }
            }
        } catch (error) {
            next(error);
        }
    }
}

export default new PostsController();
