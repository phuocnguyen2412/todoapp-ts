import { Request, Response, NextFunction } from "express";

import { verifyToken } from "../helpers/jwtToken";
import responseHandler from "../handlers/response.handler";
import User from "../models/user.model";

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return responseHandler.unauthenticate(res);
    }

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : authHeader;

    try {
        const decode = verifyToken(token);
        const user = await User.findById(decode);
        req.body.user = user;
        next();
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};
export const validateRegister = async (req: Request, res: Response) => {};
