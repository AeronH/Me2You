import axios from 'axios';

const baseUrl = 'http://localhost:3080/auth';

class AuthService {
    async login(username: string, password: string) {
        try {
            const response = await axios.post(`${baseUrl}/login`, {
                username,
                password,
            });

            console.log(response);

            const accessToken = response.data.accessToken;
            localStorage.setItem('token', accessToken);

            return {
                isSuccessful: true,
                message: response.data.message,
            };
        } catch (err: any) {
            console.log(err);
            return err.response.data.message;
        }
    }

    async logout() {}

    async register() {}
}

export default new AuthService();
