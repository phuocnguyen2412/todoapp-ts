import { editTask } from "./../controllers/task/Task.controller";
import {
    validateCreatTask,
    validateEditTask,
    validateUserIdAndTaskId,
} from "./../validations/task.validation";
import { Router } from "express";
import { validateTask } from "../validations/task.validation";
import {
    addTask,
    addUserToTask,
    getAllTask,
    getTaskByOptions,
    removeTask,
    removeUserFromTask,
} from "../controllers/task/Task.controller";

const taskRoute: Router = Router();
taskRoute.delete("/remove-task", removeTask);
taskRoute.delete(
    "/remove-user-from-task/:id",
    validateUserIdAndTaskId,
    removeUserFromTask
);
taskRoute.post("/add-user-to-task", addUserToTask);
taskRoute.post(
    "/add-task",
    validateCreatTask,
    validateTask,
    validateCreatTask,
    addTask
);
taskRoute.put("/edit-task/:id", validateEditTask, validateEditTask, editTask);
taskRoute.get("/get-all-task", getAllTask);
taskRoute.get("/get-task-by-options", getTaskByOptions);
export default taskRoute;
