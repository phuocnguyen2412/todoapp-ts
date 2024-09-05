import { userDataBase } from "./../../constants/constantType";
import { Request, Response } from "express";
import User from "../../models/user.model";
import { generateToken } from "../../helpers/jwtToken";
import { comparePassword, hashPassword } from "../../helpers/hashPassword";
import responseHandler from "../../handlers/response.handler";

import { genOTP, genOTPExpired } from "../../helpers/genOTP";
import { sendOtpEmail } from "../../helpers/sendOtpEmail";

import { Types } from "mongoose";
export const login = async (
    req: Request<{}, {}, { email: string; password: string }>,
    res: Response
) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email,
        });

        if (user === null)
            return responseHandler.badRequest(res, "Not found your account!");
        if ((await comparePassword(password, user.account.password)) === false)
            return responseHandler.notFound(res, "Wrong password!");
        if (user.isValidated == false) {
            const otp = genOTP().toString();
            const otpExp = genOTPExpired();
            user.account.otp = otp;
            user.account.otpExp = otpExp;
            await user.save();
            sendOtpEmail({ email: user.email, name: user.name, otp });
            return responseHandler.badRequestWithData(
                res,
                "Please validate your account",
                { acessToken: generateToken(user.id), _id: user.id }
            );
        }
        responseHandler.ok(
            res,
            {
                accessToken: generateToken(user.id),
            },
            "Đăng nhập thành công"
        );
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};

export const register = async (
    req: Request<
        {},
        {},
        {
            email: string;
            password: string;
            name: string;
        }
    >,
    res: Response
) => {
    try {
        const { email, password, name } = req.body;

        const checkDuplicate = User.findOne({ email });
        if (checkDuplicate != null)
            return responseHandler.badRequest(res, "Đã tồn tại tài khoản");

        const otp = genOTP();
        const otpExpired = genOTPExpired();
        const userData: userDataBase = {
            email,
            name,
            otp: otp.toString(),
        };
        const user = await User.create({
            email,
            name,
            account: {
                password: await hashPassword(password),
                otp: otp.toString(),
                otpExp: otpExpired,
            },
            isValidated: false,
        });

        responseHandler.created(
            res,
            {
                accessToken: generateToken(user.id),
            },
            "Đăng ký thành công, hãy xác thực tài khoản"
        );

        await sendOtpEmail(userData);
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};

export const confirmOtp = async (
    req: Request<
        {},
        {},
        {
            userId: Types.ObjectId;
            otpConfirm: String;
        }
    >,
    res: Response
) => {
    const { userId, otpConfirm } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return responseHandler.notFound(res, "User not found");
        }
        if (!user.account.otp) {
            return responseHandler.notFound(res, "fail to confirm otp");
        }
        if (user.account.otp !== otpConfirm)
            return responseHandler.unauthenticate(res, "Invalid Otp");

        await User.findByIdAndUpdate(userId, {
            $set: { "account.otp": null, "account.otpExp": null },
        });
        user.isValidated = true;
        await user.save();

        responseHandler.ok(res, {}, "Otp is confirmed and account validated ");
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};
