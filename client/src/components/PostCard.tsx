import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    Typography,
} from '@mui/material';
import { Post } from '../utils/types';
import { formatDate } from '../utils/formatters';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PostsService from '../services/posts.service';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface Props {
    postId: string;
}

function PostCard({ postId }: Props) {
    const [postLiked, setPostLiked] = useState<Boolean>(false);
    const [post, setPost] = useState<Post>();
    const [postLikeReset, setPostCountReset] = useState(0);

    const isLoggedIn = useSelector(
        (state: RootState) => state.currentUser.isLoggedIn
    );

    async function onLike() {
        await PostsService.likePost(postId);

        setPostCountReset(postLikeReset + 1);
    }

    async function getPostInfo() {
        const response = await PostsService.getPostById(postId);
        setPost(response);
    }

    async function checkIfPostLiked() {
        const response = await PostsService.isPostLiked(postId);

        setPostLiked(response);
    }

    useEffect(() => {
        (async () => {
            await getPostInfo();
            if (isLoggedIn) {
                await checkIfPostLiked();
            } else {
                setPostLiked(false);
            }
        })();
    }, [postLikeReset, isLoggedIn]);

    return (
        <Card variant="outlined" sx={{ width: 500 }} className="cursor-pointer">
            {post ? (
                <div>
                    <CardHeader
                        avatar={<Avatar />}
                        subheader={formatDate(post.createdAt)}
                        title={`@${post.createdBy.username}`}
                    />
                    <CardContent>
                        <Typography variant="body1">{post.bodyText}</Typography>
                    </CardContent>
                    <CardActions>
                        <div className="flex items-center mr-3">
                            <IconButton size="small" onClick={onLike}>
                                {postLiked ? (
                                    <FavoriteIcon />
                                ) : (
                                    <FavoriteBorderIcon />
                                )}
                            </IconButton>
                            <p className="text-sm ml-1">{post.likes}</p>
                        </div>
                        <div className="flex items-center">
                            <IconButton size="small">
                                <ChatBubbleOutlineIcon />
                            </IconButton>
                            <p className="text-sm ml-1">0</p>
                        </div>
                    </CardActions>
                </div>
            ) : (
                <div>Loading</div>
            )}
        </Card>
    );
}

export default PostCard;
