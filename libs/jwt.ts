import { JwtPayload } from "@/app/dashboard/types/Decode";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

const jwt_secret: string = process.env.JWT_SECRET as string;
// const jwt_expires_in: string = process.env.JWT_EXPIRED as string;

export const generateToken = (payload: object) => {
  return jwt.sign(payload, jwt_secret, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwt_secret);
};

export const decodetoken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (err: any) {
    console.error("Invalid Token" + err.message);
    return null;
  }
};
