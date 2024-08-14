import { body } from "express-validator";
export const validateLogin = [
    body("email").isEmail().withMessage("Email không hợp lệ"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Mật khẩu phải có ít nhất 6 ký tự"),
];

// Middleware để kiểm tra dữ liệu nhập vào cho register
export const validateRegister = [
    body("email").isEmail().withMessage("Email không hợp lệ"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Mật khẩu phải có ít nhất 6 ký tự"),
    body("name").notEmpty().withMessage("Tên không được để trống"),
];
