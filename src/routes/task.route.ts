import { Router } from "express";
import { validateTask } from "../validations/task.validation";
import { addTask, getAllTask, getTaskByOptions } from "../controllers/task/task.controller";



const taskRoute : Router = Router();

taskRoute.post("/add-task", validateTask , addTask );
taskRoute.get("/getAllTask",getAllTask)
taskRoute.get("/getTaskByOptions",getTaskByOptions)
export default taskRoute
