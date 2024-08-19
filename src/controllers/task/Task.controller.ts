import { Request, Response } from "express";
import { Types } from "mongoose";
import responseHandler from "../../handlers/response.handler";
import { validateBody } from "../../handlers/validation.handler";
import Task from "../../models/task.model";

import { getNextDate } from "./../../helpers/getDate";
import { getPagination, PaginationParams } from "../../helpers/pagination";
import { count, error } from "console";
import User from "../../models/user.model";

export const addTask = async (req: Request, res: Response) => {
    try {
        const validateTaskResult: string = validateBody(req);
        if (validateTaskResult.length > 0) {
            return responseHandler.badRequest(res, validateTaskResult);
        }

        const {
            title,
            description,
            users = [],
            time = getNextDate(),
        } = req.body as {
            title: string;
            description: string;
            users?: Types.ObjectId[];
            time: Date;
        };

        const newTask = new Task({
            title,
            description,
            users,
            status: "todo",
            time,
        });
        await newTask.save();
        return responseHandler.created(res, newTask, "Created");
    } catch (error: any) {
        return responseHandler.error(res, error);
    }
};

export const editTask = async (req: Request, res: Response) => {
    try {
        const validateEditTaskResult: string = validateBody(req);
        if (validateEditTaskResult.length > 0) {
            return responseHandler.badRequest(res, validateEditTaskResult);
        }

        const taskId = req.params.id;
        if (!Types.ObjectId.isValid(taskId)) {
            return responseHandler.notFound(res, "Invalid Id");
        }
        const isExistTask = await Task.findById(taskId);
        if (!isExistTask) {
            return responseHandler.notFound(res, "Task Id not Found");
        }

        const isExistOldTask = await Task.findOne({
            _id: taskId,
            isDeleted: false,
        });
        if (!isExistOldTask) {
            return responseHandler.notFound(res, "Task not Found");
        }

        const {
            status = isExistTask.status,
            title = isExistOldTask.title,
            description = isExistOldTask.description,
            users = isExistOldTask.users,
            time = isExistOldTask.time,
        } = req.body as {
            status?: "todo" | "doing" | "done";
            title?: string;
            description?: string;
            users?: Types.ObjectId[];
            time?: Date;
        };
        console.log(status);

        const updatedTask = await Task.findByIdAndUpdate(taskId, {
            status: status,

            title: title,
            description: description,
            users: users,
            time: time,
        });
        if (updatedTask == null)
            return responseHandler.badRequest(res, "Task not found");
        return responseHandler.ok(res, updatedTask, "Edit Success");
    } catch (error: any) {
        return responseHandler.error(res, error);
    }
};

export const getAllTask = async (req: Request, res: Response) => {
    try {
        const allTask = await Task.find({ isDeleted: false }).populate(
            "users",
            "_id name"
        );
        responseHandler.ok(res, allTask, "Get All Task Success");
    } catch (err: any) {
        console.log(err);
        responseHandler.error(res, err);
    }
};

export const getTaskByOptions = async (req: Request, res: Response) => {
    type SortOption = "title" | "time" | "status";
    type Status = "todo" | "doing" | "done";
    type SortOptionMongodb = { [key: string]: 1 | -1 };
    //type, sort, title, offset, limit
    interface FilterOption {
        isDeleted: boolean;
        title?: RegExp;
        status?: string;
    }
    let taskOption: FilterOption = {
        isDeleted: false,
    };
    const { status, sort, title, offset, limit } = req.query as unknown as {
        status: Status;
        sort: SortOption;
        title: string;
        offset: number;
        limit: number;
    };
    const paging: PaginationParams = getPagination(offset, limit);
    if (title) {
        taskOption.title = new RegExp(title, "i");
    }
    if (status) {
        taskOption.status = status;
    }
    let sortOption: SortOptionMongodb = {};
    if (sort) {
        sortOption[sort] = 1;
    }
    try {
        const tasks = await Task.find(taskOption)
            .populate("users", "_id name")
            .limit(paging.limit)
            .skip(paging.skip)
            .sort(sortOption)
            .select("-v -isDeleted");

        responseHandler.ok(res, tasks, "find sucess");
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};

export const removeUserFromTask = async (req: Request, res: Response) => {
    const { userId, taskId } = req.body as {
        userId: Types.ObjectId;
        taskId: Types.ObjectId;
    };
    try {
        const user = await User.findById(userId);
        if (!user) {
            return responseHandler.notFound(res, "User not Found by ID");
        }

        const isExistTask = await Task.findOne({
            _id: taskId,
            isDeleted: false,
        });
        if (!isExistTask) {
            return responseHandler.notFound(res, "Task not Found");
        }
        if (isExistTask.status == "done") {
            return responseHandler.notFound(res, "Task has done already");
        }

        const isExistUserInTask = isExistTask.users.some((_userId) => {
            if (_userId.toString() === userId.toString()) {
                return true;
            }
        });
        if (!isExistUserInTask) {
            return responseHandler.notFound(res, "User not Found in Task");
        }

        const newUser = isExistTask.users.filter(
            (_userId) => _userId.toString() !== userId.toString()
        );
        const newTaskAfterRemoveUser = await Task.findOneAndUpdate(
            { _id: taskId, isDeleted: false },
            { users: newUser },
            { new: true }
        );
        if (!newTaskAfterRemoveUser) {
            return responseHandler.notFound(
                res,
                "Task After Remove User not Found"
            );
        }
        return responseHandler.ok(
            res,
            newTaskAfterRemoveUser,
            "Remove Uer success"
        );
    } catch (error: any) {
        return responseHandler.error(res, error);
    }
};

export const addUserToTask = async (req: Request, res: Response) => {
    const { userId, taskId } = req.body as {
        userId: Types.ObjectId;
        taskId: Types.ObjectId;
    };
    try {
        const user = await User.findById(userId);

        if (!user) {
            return responseHandler.notFound(res, "User not Found");
        }
        const task = await Task.findOne({ _id: taskId, isDeleted: false });
        if (!task) return responseHandler.notFound(res, "Task notFound");
        if (task.users.toString().includes(userId.toString())) {
            return responseHandler.notFound(res, "user is already exists");
        }
        task.users.push(userId);
        task.save();
        responseHandler.ok(res, task, "Add user success");
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};

export const removeTask = async (req: Request, res: Response) => {
    const { taskId } = req.body as {
        taskId: Types.ObjectId;
    };
    try {
        const task = await Task.findOneAndUpdate(
            { _id: taskId, isDeleted: false },
            { isDeleted: true }
        );
        if (!task) return responseHandler.notFound(res, "task not found");

        responseHandler.ok(res, { task }, "Remove Success");
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};
