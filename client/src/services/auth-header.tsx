export default function authHeader() {
    const accessToken = localStorage.getItem('token') as string;

    if (accessToken) {
        return { authorization: `Bearer ${accessToken}` };
    } else {
        return {};
    }
}
