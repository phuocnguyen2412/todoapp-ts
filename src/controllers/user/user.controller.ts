import { Types } from "mongoose";
import User from "../../models/user.model"

export const getUserById = async (userId: Types.ObjectId)=>{
    try {
        const user = await User.find({_id:userId})
        return user
    } catch (error) {
        console.log(error)
    }
}