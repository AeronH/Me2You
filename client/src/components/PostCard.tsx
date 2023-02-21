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

interface Props {
    post: Post;
}

function PostCard({ post }: Props) {
    async function getPostInfo() {}
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
                    <IconButton size="small">
                        <FavoriteBorderIcon />
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
