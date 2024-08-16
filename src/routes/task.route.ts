import { editTask } from './../controllers/task/task.controller';
import { validateEditTask } from './../validations/task.validation';
import { Router } from "express";
import { validateTask } from "../validations/task.validation";
import { addTask, addUserToTask, getAllTask, getTaskByOptions, removeTask } from "../controllers/task/task.controller";



const taskRoute : Router = Router();
taskRoute.delete('/removeTask',removeTask)
taskRoute.post("/addUserToTask",addUserToTask)
taskRoute.post("/add-task", validateTask , addTask );
taskRoute.put("/edit-task/:id", validateEditTask , editTask )
taskRoute.get("/getAllTask",getAllTask)
taskRoute.get("/getTaskByOptions",getTaskByOptions)
export default taskRoute
