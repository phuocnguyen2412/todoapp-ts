
import { Request, Response } from "express";
import Task from "../../models/task.model";
import User from "../../models/user.model";
import { validateBody } from "../../handlers/validation.handler";
import responseHandler from "../../handlers/response.handler";
import { Types } from "mongoose";


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