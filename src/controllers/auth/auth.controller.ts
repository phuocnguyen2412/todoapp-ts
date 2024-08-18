import { userDataBase } from './../../constants/constantType';
import { Request, Response } from "express";
import User from "../../models/user.model";
import { generateToken } from "../../helpers/jwtToken";
import { comparePassword, hashPassword } from "../../helpers/hashPassword";
import responseHandler from "../../handlers/response.handler";
import { error, log } from "console";
import { validateBody } from "../../handlers/validation.handler";
import { genOTP, genOTPExpired } from "../../helpers/genOTP";
import { sendOtpEmail } from "../../helpers/sendOtpEmail";
import { access } from 'fs';
import { Types } from 'mongoose';
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
        if(user.isValidated==false){
            const otp = genOTP().toString()
            const otpExp = genOTPExpired()
            user.account.otp = otp
            user.account.otpExp = otpExp
            await user.save()
            sendOtpEmail({email : user.email,name: user.name,otp })
            return responseHandler.badRequestWithData(res,"Please validate your account",{acessToken: generateToken(user.id),_id:user.id })
        }
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

        const otp = genOTP();
        const otpExpired = genOTPExpired();
        const userData : userDataBase = {
            email,
            name,
            otp : otp.toString()
        }
        const user = await User.create({
            email,
            name,
            account: {
                password: await hashPassword(password),
                otp : otp.toString(),
                otpExp : otpExpired
            },
            isValidated : false,
        });

        responseHandler.created(
            res,
            {
                accessToken: generateToken(user.id),
            },
            "Đăng ký thành công, hãy xác thực tài khoản"
        );

        try {
            await sendOtpEmail( userData );
        } catch ( error : any ) {
            responseHandler.error( res, error );
        }
        
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};

export const  confirmOtp = async (req: Request,res: Response)=>{
    const {userId,otpConfirm} = req.body as unknown as{
        userId: Types.ObjectId;
        otpConfirm: String;
    }

    try {
        const user = await User.findById(userId)
        if(!user)
        {
            return responseHandler.notFound(res,"User not found")
        }
        if(!user.account.otp)
        {
            return responseHandler.notFound(res,"fail to confirm otp")
        }
        if(user.account.otp==otpConfirm)
        {
            await User.findByIdAndUpdate(userId,{$set: { 'account.otp': null,"account.otpExp": null}})
            user.isValidated = true
            await user.save()
            return responseHandler.ok(res,{},"Otp is confirmed and account validated ")
        }
        else{
            return responseHandler.unauthenticate(res,"Invalid Otp")
        }
    } catch (error:any) {

        return responseHandler.error(res,error)
    }

}


