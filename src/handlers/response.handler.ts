import { Response } from "express";

const responseWithData = (
    res: Response,
    statusCode: number,
    data: object,
    message: string,
    isOk: boolean
) => res.status(statusCode).json({ isOk, data, message, statusCode });

export const ok = (
    res: Response,
    data: object | Array<object>,
    message: string
) => responseWithData(res, 200, data, message, true);

export const created = (
    res: Response,
    data: object | Array<object>,
    message: string
) => responseWithData(res, 201, data, message, true);

export const unauthenticate = (res: Response,message: string) =>
    responseWithData(res, 401, {}, message, false);

export const unauthorize = (res: Response) =>
    responseWithData(res, 403, {}, "You can't do that!", false);

export const notFound = (res: Response, message: string) =>
    responseWithData(res, 404, [], message, false);

export const badRequest = (res: Response, message: string) =>
    responseWithData(res, 400, {}, message, false);

export const error = (res: Response, error: Error) =>
    responseWithData(res, 500, error, "Error in server!", false);
export const badRequestWithData = (res: Response, message: string,data:Object| Array<object>) =>
    responseWithData(res, 400, data, message, false);
const responseHandler = {
    ok,
    created,
    unauthenticate,
    unauthorize,
    notFound,
    badRequest,
    badRequestWithData,
    error,
};
export default responseHandler;
