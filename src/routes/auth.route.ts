
import { Router } from "express";
import { confirmOtp, login, register } from "../controllers/auth/auth.controller";
import { validateLogin } from "../validations/auth.validation";


const authRoute: Router = Router();

authRoute.post("/login", validateLogin, login);
authRoute.post("/register", register);
authRoute.post('/confirmOtp',confirmOtp)
export default authRoute;
