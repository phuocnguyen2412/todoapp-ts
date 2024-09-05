import { Router } from "express";
import {
    confirmOtp,
    login,
    register,
} from "../controllers/auth/auth.controller";
import {
    validateConfirmOtp,
    validateLogin,
    validateRegister,
} from "../validations/auth.validation";
import { validateHandler } from "../handlers/validation.handler";

const authRoute: Router = Router();

authRoute.post("/login", validateLogin, validateHandler, login);
authRoute.post("/register", validateRegister, validateHandler, register);
authRoute.post("/confirmOtp", validateConfirmOtp, confirmOtp);
export default authRoute;
