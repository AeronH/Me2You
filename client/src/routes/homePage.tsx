import { useEffect, useState } from 'react';
import { Post } from '../utils/types';
import PostCard from '../components/PostCard';
import { Button, TextField } from '@mui/material';
import PostsService from '../services/posts.service';

function homePage() {
    const [posts, setPosts] = useState<Post[]>();

    const [newPost, setNewPost] = useState('');

    async function submitPost() {
        try {
            await PostsService.createNewPost(newPost);

            setNewPost('');
        } catch {}
    }

    useEffect(() => {
        (async () => {
            const posts = await PostsService.getAllPosts();
            setPosts(posts);
        })();
    }, []);
    return (
        <main className="p-10 ml-60 flex flex-col items-center w-full">
            <section className="w-full flex justify-center mb-10 gap-4">
                <TextField
                    placeholder="Create a post"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                />
                <Button variant="contained" onClick={submitPost}>
                    Post
                </Button>
            </section>
            <section className="flex flex-col gap-4 h-fit">
                {posts?.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </section>
        </main>
    );
}

export default homePage;
