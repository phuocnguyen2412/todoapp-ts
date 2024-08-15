import { Request, Response } from "express";

import User from "../../models/user.model";

import { generateToken } from "../../helpers/jwtToken";
import { comparePassword, hashPassword } from "../../helpers/hashPassword";

import responseHandler from "../../handlers/response.handler";
import { log } from "console";

import { validateBody } from "../../handlers/validation.handler";

export const login = async (req: Request, res: Response) => {
    try {
        const validateResult: string = validateBody(req);
        if (validateResult.length > 0)
            return responseHandler.badRequest(res, validateResult);
        
        const { email, password } = req.body as {
            email: string;
            password: string;
        };

        const user = await User.findOne({
            email: email,
        });

        if (user === null)
            return responseHandler.badRequest(res, "Not found your account!");

        if ((await comparePassword(password, user.account.password)) === false)
            return responseHandler.notFound(res, "Wrong password!");

        responseHandler.ok(
            res,
            {
                accessToken: generateToken(user.id),
            },
            "Đăng nhập thành công"
        );
    } catch (error: any) {
        log(error);
        responseHandler.error(res, error);
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body as {
            email: string;
            password: string;
            name: string;
        };

        const user = await User.create({
            email,
            name,
            account: {
                password: hashPassword(password),
            },
        });

        responseHandler.created(
            res,
            {
                accessToken: generateToken(user.id),
            },
            "Đăng ký thành công, hãy xác thực tài khoản"
        );
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};
