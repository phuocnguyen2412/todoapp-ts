import express from "express"
import { getAllTask } from "../controllers/task/Task.controller"


const task_route = express.Router()

task_route.get("getAllTask",getAllTask)

export default task_route 
