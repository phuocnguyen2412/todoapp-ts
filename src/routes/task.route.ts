import { Router } from "express";
import { addTask } from "../controllers/auth/task.controller";
import { validateTask } from "../validations/task.validation";
import { getAllTask } from "../controllers/task/Task.controller"


const taskRoute : Router = Router();

taskRoute.post("/add-task", validateTask , addTask );
taskRoute.get("getAllTask",getAllTask)

export default taskRoute
