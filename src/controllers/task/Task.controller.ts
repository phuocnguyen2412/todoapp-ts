import { Request, Response } from "express"
import Task from "../../models/task.model"
import responseHandler from "../../handlers/response.handler"


export const getAllTask = async(req:Request,res:Response)=>{
    try{
        const allTask = await Task.find()
        responseHandler.ok(res,allTask,"Get All Task Success",)
    }
    catch(err: any)
    {
        console.log(err)
        responseHandler.error(res,err)
    }
    
    
}

export const getTask= async (req:Request,res:Response)=>{
    interface option{}
    const {title,type,sort,offset,limit} = req.query
    

}

export default {getAllTask}
