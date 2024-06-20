import jwt from 'jsonwebtoken'

export interface TokenPayload {
    userId: string;
    role: string;
}

export const generateToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
}