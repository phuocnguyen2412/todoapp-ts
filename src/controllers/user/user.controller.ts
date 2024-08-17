import { Types } from "mongoose";
import User from "../../models/user.model"
import responseHandler from "../../handlers/response.handler";
import {Request,Response} from "express"




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
            await User.findByIdAndUpdate(userId,{$set: { 'account.otp': null}})
            user.isValidated = true
            await user.save()
            return responseHandler.ok(res,{},"Otp is confirmed and account validated ")
        }
        else{
            return responseHandler.notFound(res,"Invalid Otp")
        }
    } catch (error:any) {

        return responseHandler.error(res,error)
    }

}