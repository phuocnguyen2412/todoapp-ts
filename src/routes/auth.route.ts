import { Router } from "express";
import { login, register } from "../controllers/auth/auth.controller";

const authRoute: Router = Router();

authRoute.post("/login", login);
authRoute.post("/register", register);
export default authRoute;
