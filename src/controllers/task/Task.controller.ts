import { Request, Response } from "express"
import Task from "../../models/task.model"
import responseHandler from "../../handlers/response.handler"
import User from "../../models/user.model";
import { validateBody } from "../../handlers/validation.handler";
import { Types } from "mongoose";
import { title } from "process";


export const addTask = async( req: Request, res: Response ) => {
    try {
        const validateTaskResult: string = validateBody(req);
        if( validateTaskResult.length > 0 ) {
            return responseHandler.badRequest( res, validateTaskResult )
        }
        
        const { title, description, users = [], time = new Date() } = req.body as {
            title: string,
            description: string,
            users?: Types.ObjectId[],
            time : Date
        }

        const newTask = new Task({     
            title,
            description,
            users,
            status: "todo",
            time
        });

        await newTask.save();


        return responseHandler.created( res, newTask, "Created" )
    } catch (error : any ) {
        return responseHandler.error( res, error );
    }
}



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

export const getTaskByOptions= async (req:Request,res:Response)=>{
    type Sort = -1|1 
    type Status = "todo" | "doing" | "done"
    //type, sort, title, offset, limit

    let taskOption: any = {
        "sort": 1,
        "offset": 0,
        "limit": 100,
    }
    let filter : any = {}

    const { status, sort, title, offset, limit } = req.query as unknown as {
        status: Status;
        sort: Sort;
        title: string;
        offset: number;
        limit: number;
        
    }
    if(sort!=null)
    {
        taskOption.sort= sort
    }
    if(offset!=null)
    {
        taskOption.offset=offset
    }
    if(limit!=null)
    {
        taskOption.limit=limit
    }
    if(title!=null)
    {
        filter.title = new RegExp(title, 'i')
    }
    if(status!=null)
    {
        filter.status = status
    }


    try {

        const tasks = await Task.find(filter).limit(taskOption.limit).sort( { time : taskOption.sort } ).skip(taskOption.offset).select('-id -isDelected')

        responseHandler.ok(res,tasks,"find sucess")
    
    } catch (error: any) {
        responseHandler.error(res,error)
    }

    

}
