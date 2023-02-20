import axios from 'axios';
import { Post } from '../utils/types';
import authHeader from './auth-header';

const baseUrl = 'http://localhost:3080/api';

class PostService {
    async getAllPosts() {
        const response = await axios.get(`${baseUrl}/posts/all`, {
            headers: authHeader(),
        });

        return response.data.data as Post[];
    }

    async getPostById(id: string) {
        const response = await axios.get(
            `http://localhost:3080/api/posts/${id}`,
            { headers: authHeader() }
        );
        return response.data as Post;
    }

    async deletePostById(id: string) {
        await axios.delete(`http://localhost:3080/api/posts/${id}`, {
            headers: authHeader(),
            data: { postId: id },
        });
    }
}

export default new PostService();
