import { Request, Response, NextFunction } from 'express';
import responseHandler from "./../handlers/response.handler";
import { body } from "express-validator";


export const validateTask = [
    body("title").notEmpty().withMessage("title không được để trống"),
    body("description").notEmpty().withMessage("description không được để trống"),
];

export const validateEditTask = [
    body("title")
                .optional()
                .notEmpty()
                .withMessage("title không được để trống"),
    body("description")
                    .optional()
                    .notEmpty()
                    .withMessage("description không được để trống"),
    body("time")
                .optional()
                .isDate()
                .withMessage("time phải là ngày"),
    body("time")
                .optional()
                .notEmpty()
                .withMessage("time bị để trống")
]; 

export const validateUserIdAndTaskId = [
    body("userId")
                .isMongoId()
                .withMessage("Userid phai la ObjectId")
                .notEmpty()
                .withMessage("UserId không được để trống"),
    body("taskId")
                .isMongoId()
                .withMessage("Userid phai la ObjectId")
                .notEmpty()
                .withMessage("taskId không được để trống")
]

export const handleValidateTask = async( req: Request, res: Response, next: NextFunction ) => {
    const { title, description } = req.body as {
        title : string,
        description : string 
    }
    
    if ( title.trim().length === 0 ) {
        return responseHandler.badRequest( res, "title không được chứa khoảng trắng");
    } 

    if ( description.trim().length === 0 ) {
        return responseHandler.badRequest( res, "description không được chứa khoảng trắng");
    } 

    next();

}