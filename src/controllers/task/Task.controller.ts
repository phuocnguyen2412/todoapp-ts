import { Request, Response } from "express";
import { Types } from "mongoose";
import responseHandler from "../../handlers/response.handler";
import { validateBody } from "../../handlers/validation.handler";
import Task from "../../models/task.model";
import { getUserById } from "../user/user.controller";
import { getNextDate } from "./../../helpers/getDate";
import { getPagination, PaginationParams } from "../../helpers/pagination";

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

        const oldTask = await Task.findById({ _id : taskId })
            if ( !oldTask ) {
                return responseHandler.notFound( res, "Invalid Id" );
            }
            if ( oldTask.status == "done" ) {
                return responseHandler.notFound( res, "Task has done already" );
            }
            if ( oldTask.isDeleted == true ) {
                return responseHandler.notFound( res, "Task deleted" );
            }

        const {
            title = oldTask.title,
            description = oldTask.description,
            users = oldTask.users,
            time = oldTask.time,
        } = req.body as {
            title?: string;
            description?: string;
            users?: Types.ObjectId[];
            time?: Date;
        };

        await Task.updateOne({
            _id: taskId,
            title: title,
            description: description,
            users: users,
            time: time,
        });

        const newTask = await Task.findById(taskId).exec();
        if (!newTask) {
            return responseHandler.notFound(res, "Invalid Id");
        }

        console.log(taskId, oldTask, newTask);

        return responseHandler.ok(res, newTask, "Edit Success");
    } catch (error: any) {
        return responseHandler.error(res, error);
    }
};

export const getAllTask = async (req: Request, res: Response) => {
    try {
        const allTask = await Task.find({ isDeleted: false });
        responseHandler.ok(res, allTask, "Get All Task Success");
    } catch (err: any) {
        console.log(err);
        responseHandler.error(res, err);
    }
};

export const getTaskByOptions = async (req: Request, res: Response) => {
    type Sort = -1 | 1;
    type Status = "todo" | "doing" | "done";
    //type, sort, title, offset, limit

    let taskOption: any = {
        sort: 1,
        offset: 0,
        limit: 100,
    };
    let filter: any = {};

    const { status, sort, title, offset, limit } = req.query as unknown as {
        status: Status;
        sort: Sort;
        title: string;
        offset: number;
        limit: number;
    };
    if (sort != null) {
        taskOption.sort = sort;
    }
    if (offset != null) {
        taskOption.offset = offset;
    }
    if (limit != null) {
        taskOption.limit = limit;
    }
    if (title != null) {
        filter.title = new RegExp(title, "i");
    }
    if (status != null) {
        filter.status = status;
    }

    try {
        const tasks = await Task.find(filter)
            .limit(taskOption.limit)
            .sort({ time: taskOption.sort })
            .skip(taskOption.offset)
            .select("-id -isDelected");

        responseHandler.ok(res, tasks, "find sucess");
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};
export const getTaskByOptions2 = async (req: Request, res: Response) => {
    type SortOption = "title" | "time" | "status";
    type Status = "todo" | "doing" | "done";

    interface FilterOption {
        isDeleted: boolean;
        title?: RegExp;
        status?: Status;
    }

    const taskOption: FilterOption = {
        isDeleted: false,
    };

    const { status, sort, title, offset, limit } = req.query as unknown as {
        status?: Status;
        sort?: SortOption;
        title?: string;
        offset?: number;
        limit?: number;
    };

    if (title) {
        taskOption.title = new RegExp(title, "i");
    }

    if (status) {
        taskOption.status = status;
    }

    const paging: PaginationParams = getPagination(offset, limit);

    try {
        const tasksQuery = Task.find(taskOption)
            .limit(paging.limit)
            .skip(paging.skip)
            .select("-__v -isDeleted");

        if (sort) {
            tasksQuery.sort({ [sort]: -1 });
        }

        const tasks = await tasksQuery.exec();
        responseHandler.ok(res, tasks, "find success");
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};
export const addUserToTask = async (req: Request, res: Response) => {
    const { userId, taskId } = req.body as {
        userId: Types.ObjectId;
        taskId: Types.ObjectId;
    };
    try {
        const user = await getUserById(userId);

        if (!user) {
            responseHandler.notFound(res, "User not Found");
        }

        const task = Task.findOne({ _id: taskId, isDeleted: false })
            .then((data: any) => {
                console.log(data);
                data.users.push(userId);
                data.save();
                return data;
            })
            .then((docUpdate) => {
                responseHandler.ok(res, { docUpdate }, "Add user success");
            })
            .catch((error: any) => {
                responseHandler.notFound(res, "Task not found: " + error);
            });
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};
export const addUserToTask2 = async (req: Request, res: Response) => {
    const { userId, taskId } = req.body as {
        userId: Types.ObjectId;
        taskId: Types.ObjectId;
    };
    try {
        const user = await getUserById(userId);
        if (!user) {
            return responseHandler.notFound(res, "User not Found");
        }
        const task = await Task.findOne({ _id: taskId, isDeleted: false });
        if (task == null)
            return responseHandler.notFound(res, "Task not Found");
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
    const task = Task.findOne({ _id: taskId, isDeleted: false })
        .then((doc: any) => {
            doc.isDeleted = true;
            doc.save();
            return doc;
        })
        .then((docremove: any) => {
            responseHandler.ok(res, docremove, "remove success");
        })
        .catch((error: any) => {
            responseHandler.notFound(res, "task not found: " + error);
        });
};
export const removeTask2 = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.body as { taskId: Types.ObjectId };
        const task = await Task.findOneAndUpdate(
            { _id: taskId, isDeleted: false },
            { isDeleted: true }
        );

        if (!task) return responseHandler.notFound(res, "task not found");

        responseHandler.ok(res, task, "remove success");
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};
