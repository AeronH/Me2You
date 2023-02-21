import axios from 'axios';
import { Post } from '../utils/types';
import authHeader from './auth-header';

const baseUrl = 'http://localhost:3080';

class PostService {
    async getAllPosts() {
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
                const accessToken = await axios.post(`${baseUrl}/auth/refresh`);
                console.log(accessToken);
            }
        }
    }
}

export default new PostService();
