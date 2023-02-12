import jwt from 'jsonwebtoken';

export function generateToken(value: any) {
    return jwt.sign(value, process.env.JWT_SECRET as string, { expiresIn: '900s'});
}
