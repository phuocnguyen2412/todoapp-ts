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