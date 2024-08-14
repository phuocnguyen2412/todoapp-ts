import { Request } from "express";
import { validationResult } from "express-validator";

export const validateBody = (req: Request): string => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors
            .array()
            .map((error) => `${error.msg}`)
            .join("; ");
        return errorMessages;
    }
    return "";
};
