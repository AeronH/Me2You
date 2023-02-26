import { useEffect, useState } from 'react';
import { Post } from '../utils/types';
import PostCard from '../components/PostCard';
import { Button, TextField } from '@mui/material';
import PostsService from '../services/posts.service';

function homePage() {
    const [postIds, setPostIds] = useState<Post[]>();

    const [newPost, setNewPost] = useState('');

    async function submitPost() {
        try {
            await PostsService.createNewPost(newPost);

            setNewPost('');
        } catch {}
    }

    useEffect(() => {
        (async () => {
            const postIds = await PostsService.getAllPostIds();
            setPostIds(postIds);
        })();
    }, []);
    return (
        <main className="p-10 ml-60 flex flex-col items-center w-full border">
            <section className="w-full flex justify-center mb-10 gap-4">
                <TextField
                    placeholder="Create a post"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    variant="standard"
                    fullWidth
                />
                <Button variant="contained" onClick={submitPost}>
                    Post
                </Button>
            </section>
            <section className="flex flex-col gap-2 h-fit">
                {postIds?.map((postId, index) => (
                    <PostCard key={index} postId={postId} />
                ))}
            </section>
        </main>
    );
}

export default homePage;
