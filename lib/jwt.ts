import { JwtPayload } from '@/types/jwt-payload';
import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';

const jwt_secret: string = process.env.JWT_SECRET as string;
// const jwt_expires_in: string = process.env.JWT_EXPIRED as string;

export const generateToken = (payload: object) => {
  return jwt.sign(payload, jwt_secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwt_secret);
};

export const decodetoken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (err) {
    if (err instanceof Error) {
      console.error('Failed to decode token:', err.message);
    }
    return null;
  }
};
