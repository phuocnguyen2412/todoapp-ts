import { Router } from "express";
import { validateTask } from "../validations/task.validation";
import { addTask, getAllTask } from "../controllers/task/Task.controller";



const taskRoute : Router = Router();

taskRoute.post("/add-task", validateTask , addTask );
taskRoute.get("getAllTask",getAllTask )

export default taskRoute
