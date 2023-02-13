import jwt from 'jsonwebtoken';

function generateAccessToken(value: any) {
    return jwt.sign(value, process.env.JWT_ACCESS_TOKEN_SECRET as string, { expiresIn: '900s'});
}

function generateRefreshToken(value: any) {
    return jwt.sign(value, process.env.JWT_REFRESH_TOKEN_SECRET as string, { expiresIn: '1d'});
}

export default { generateAccessToken, generateRefreshToken }