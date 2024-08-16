import { editTask } from "./../controllers/task/Task.controller";
import {
    validateEditTask,
    handleValidateTask,
    validateUserIdAndTaskId
} from "./../validations/task.validation";
import { Router } from "express";
import { validateTask } from "../validations/task.validation";
import {
    addTask,
    addUserToTask,
    getAllTask,
    getTaskByOptions,
    removeTask,
    removeUserFromTask 
} from "../controllers/task/Task.controller";

const taskRoute: Router = Router();
taskRoute.delete("/removeTask", removeTask);
taskRoute.delete("/removeUserFromTask", validateUserIdAndTaskId , removeUserFromTask );
taskRoute.post("/addUserToTask", addUserToTask);
taskRoute.post("/add-task", validateTask, handleValidateTask, addTask);
taskRoute.put("/edit-task/:id", validateEditTask, handleValidateTask, editTask);
taskRoute.get("/getAllTask", getAllTask);
taskRoute.get("/getTaskByOptions", getTaskByOptions);
export default taskRoute;
