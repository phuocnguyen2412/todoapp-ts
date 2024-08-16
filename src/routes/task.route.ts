import { Router } from "express";
import { validateTask } from "../validations/task.validation";
import { addTask, addUserToTask, getAllTask, getTaskByOptions } from "../controllers/task/Task.controller";



const taskRoute : Router = Router();
taskRoute.get("/addUserToTask",addUserToTask)
taskRoute.post("/add-task", validateTask , addTask );
taskRoute.get("/getAllTask",getAllTask)
taskRoute.get("/getTaskByOptions",getTaskByOptions)
export default taskRoute
