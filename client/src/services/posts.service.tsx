import axios from 'axios';
import { Post } from '../utils/types';
import authHeader from './auth-header';

const baseUrl = 'http://localhost:3080';

class PostService {
    async getAllPostIds() {
        const response = await axios.get(`${baseUrl}/api/posts/all`);

        return response.data.data as Post[];
    }

    async getPostById(id: string) {
        const response = await axios.get(`${baseUrl}/api/posts/${id}`);
        return response.data as Post;
    }

    async deletePostById(id: string) {
        await axios.delete(`${baseUrl}/api/posts/${id}`, {
            headers: authHeader(),
        });
    }

    async createNewPost(post: string) {
        try {
            const response = await axios.post(
                `${baseUrl}/api/posts/`,
                { bodyText: post },
                {
                    headers: authHeader(),
                }
            );
            return response;
        } catch (err: any) {
            if (err.response.status === 401) {
                // If fails because token isn't validated, attempts to get a new access token
                const accessToken = await axios.post(`${baseUrl}/auth/refresh`);
                if (accessToken) {
                    localStorage.setItem('token', accessToken.data);
                    this.createNewPost(post);
                }
            }
        }
    }

    async likePost(id: string) {
        try {
            const response = await axios.put(
                `${baseUrl}/api/posts/like`,
                { postId: id },
                { headers: authHeader() }
            );
            return response.data;
        } catch (err: any) {
            console.log(err);
            return null;
        }
    }

    async isPostLiked(id: string) {
        try {
            const response = await axios.get(
                `${baseUrl}/api/posts/isLiked/${id}`,
                { headers: authHeader() }
            );
            return response.data.isPostLiked;
        } catch (err: any) {
            console.log(err);
            return false;
        }
    }
}

export default new PostService();
