import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState<string>('');

    const navigate = useNavigate();

    async function handleLogin(event: any) {
        event.preventDefault();

        const loginResponse = await AuthService.login(username, password);

        if (loginResponse.isSuccessful) {
            setLoginError('');
            navigate('/home');
        } else {
            setLoginError(loginResponse);
        }
    }

    return (
        <main className="mx-auto max-w-6xl h-screen flex justify-center items-center">
            <div className="h-[500px] w-[350px] p-6 bg-slate-200 flex flex-col justify-around items-center">
                <h1 className="font-semibold text-2xl">Twotter</h1>
                <form
                    className="flex flex-col items-center gap-6"
                    onSubmit={handleLogin}
                >
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Login
                    </Button>
                </form>
                <p>{loginError}</p>
            </div>
        </main>
    );
}

export default LoginPage;
