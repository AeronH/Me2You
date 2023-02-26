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
import { setLikedPosts } from '../redux/userSlice';

interface Props {
    post: Post;
}

function PostCard({ post }: Props) {
    const likedPosts: string[] = useSelector(
        (state: RootState) => state.currentUser.likedPosts
    );

    const [postLiked, setPostLiked] = useState<Boolean>();

    function checkIfPostLiked() {
        if (likedPosts.length > 0) {
            for (const likedPost of likedPosts) {
                if (likedPost === post.id) {
                    return true;
                }
            }
        }
        return false;
    }

    async function getPostInfo() {}

    async function likePost() {
        const response = await PostsService.likePost(post.id);

        setLikedPosts(response.likedPosts);
        setPostLiked(!postLiked);
    }

    useEffect(() => {
        if (checkIfPostLiked()) {
            setPostLiked(true);
        } else {
            setPostLiked(false);
        }
    }, [likedPosts]);

    return (
        <Card
            variant="outlined"
            sx={{ width: 500 }}
            className="cursor-pointer"
            onClick={getPostInfo}
        >
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
                    <IconButton size="small" onClick={likePost}>
                        {postLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
        </Card>
    );
}

export default PostCard;
