import express, { Router } from "express"
import { getAllTask } from "../controllers/task/task.controller"


const task_route: Router = express.Router()

task_route.get("/getAllTask",getAllTask)

export default task_route 
