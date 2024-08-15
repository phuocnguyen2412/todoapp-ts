import { body } from "express-validator";


export const validateTask = [
    body("title").notEmpty().withMessage("Title không được để trống"),
    body("description").notEmpty().withMessage("description không được để trống"),
];