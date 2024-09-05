import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import responseHandler from "./response.handler";

export const validateHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors
            .array()
            .map((error) => `${error.msg}`)
            .join("; ");

        return responseHandler.badRequest(res, errorMessages);
    }
    next();
};
