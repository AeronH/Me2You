import axios from 'axios';
import authHeader from './auth-header';

const baseUrl = 'http://localhost:3080/auth';

class AuthService {
    async login(username: string, password: string) {
        try {
            const response = await axios.post(`${baseUrl}/login`, {
                username,
                password,
            });

            const accessToken = response.data.accessToken;
            localStorage.setItem('token', accessToken);

            return {
                isSuccessful: true,
                message: response.data.message,
            };
        } catch (err: any) {
            console.log(err);
            return { isSuccessful: false, message: 'There was an error' };
        }
    }

    async getLoggedInUserDetails() {
        try {
            const response = await axios.get(`${baseUrl}/currentUser`, {
                headers: authHeader(),
            });

            return response.data;
        } catch (err: any) {
            console.log(err);
        }
    }

    async logout() {
        localStorage.removeItem('token');
    }

    async register() {}
}

export default new AuthService();
