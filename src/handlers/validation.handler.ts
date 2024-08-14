import { Request } from "express";
import { Result, ValidationError, validationResult } from "express-validator";

export const validateBody = (req: Request): string => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages: string = errors
            .array()
            .map((error) => `${error.msg}`)
            .join("; ");
        return errorMessages;
    }
    return "";
};
