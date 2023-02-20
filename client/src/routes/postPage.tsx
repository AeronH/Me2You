import { useEffect } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { Post } from '../utils/types';

function postPage() {
    const post = useRouteLoaderData('post') as Post;

    return (
        <div>
            <h1>{post.createdBy.username}</h1>
            <p>{post.bodyText}</p>
        </div>
    );
}

export default postPage;
