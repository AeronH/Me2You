import { useEffect, useState } from 'react';
import { Post } from '../utils/types';
import PostService from '../services/posts.service';

function homePage() {
    const [posts, setPosts] = useState<Post[]>();

    useEffect(() => {
        (async () => {
            setPosts(await PostService.getAllPosts());
        })();
    }, []);
    return (
        <div>
            {posts?.map((post) => (
                <div className="mb-4" key={post.id}>
                    {post.bodyText} -{post.createdBy.username}
                </div>
            ))}
        </div>
    );
}

export default homePage;
