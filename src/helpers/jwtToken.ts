import jwt from "jsonwebtoken";

import env from "../env";

const SECRET_KEY = env.envServer.JWT_SECRET || "your-secret-key";

export const generateToken = (data: string | object): string => {
    return jwt.sign({ data }, SECRET_KEY);
};

export const verifyToken = (token: string): string | jwt.JwtPayload => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        throw new Error("Invalid token");
    }
};
