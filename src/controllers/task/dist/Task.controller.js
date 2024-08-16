"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.removeTask2 = exports.removeTask = exports.addUserToTask2 = exports.addUserToTask = exports.getTaskByOptions2 = exports.getTaskByOptions = exports.getAllTask = exports.editTask = exports.addTask = void 0;
var mongoose_1 = require("mongoose");
var response_handler_1 = require("../../handlers/response.handler");
var validation_handler_1 = require("../../handlers/validation.handler");
var task_model_1 = require("../../models/task.model");
var user_controller_1 = require("../user/user.controller");
var getDate_1 = require("./../../helpers/getDate");
var pagination_1 = require("../../helpers/pagination");
exports.addTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validateTaskResult, _a, title, description, _b, users, _c, time, newTask, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                validateTaskResult = validation_handler_1.validateBody(req);
                if (validateTaskResult.length > 0) {
                    return [2 /*return*/, response_handler_1["default"].badRequest(res, validateTaskResult)];
                }
                _a = req.body, title = _a.title, description = _a.description, _b = _a.users, users = _b === void 0 ? [] : _b, _c = _a.time, time = _c === void 0 ? getDate_1.getNextDate() : _c;
                newTask = new task_model_1["default"]({
                    title: title,
                    description: description,
                    users: users,
                    status: "todo",
                    time: time
                });
                return [4 /*yield*/, newTask.save()];
            case 1:
                _d.sent();
                return [2 /*return*/, response_handler_1["default"].created(res, newTask, "Created")];
            case 2:
                error_1 = _d.sent();
                return [2 /*return*/, response_handler_1["default"].error(res, error_1)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.editTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validateEditTaskResult, taskId, oldTask, _a, _b, title, _c, description, _d, users, _e, time, newTask, error_2;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 4, , 5]);
                validateEditTaskResult = validation_handler_1.validateBody(req);
                if (validateEditTaskResult.length > 0) {
                    return [2 /*return*/, response_handler_1["default"].badRequest(res, validateEditTaskResult)];
                }
                taskId = req.params.id;
                if (!mongoose_1.Types.ObjectId.isValid(taskId)) {
                    return [2 /*return*/, response_handler_1["default"].notFound(res, "Invalid Id")];
                }
                return [4 /*yield*/, task_model_1["default"].findById(taskId).exec()];
            case 1:
                oldTask = _f.sent();
                if (!oldTask) {
                    return [2 /*return*/, response_handler_1["default"].notFound(res, "Task not found")];
                }
                _a = req.body, _b = _a.title, title = _b === void 0 ? oldTask.title : _b, _c = _a.description, description = _c === void 0 ? oldTask.description : _c, _d = _a.users, users = _d === void 0 ? oldTask.users : _d, _e = _a.time, time = _e === void 0 ? oldTask.time : _e;
                return [4 /*yield*/, task_model_1["default"].updateOne({
                        _id: taskId,
                        title: title,
                        description: description,
                        users: users,
                        time: time
                    })];
            case 2:
                _f.sent();
                return [4 /*yield*/, task_model_1["default"].findById(taskId).exec()];
            case 3:
                newTask = _f.sent();
                if (!newTask) {
                    return [2 /*return*/, response_handler_1["default"].notFound(res, "Invalid Id")];
                }
                console.log(taskId, oldTask, newTask);
                return [2 /*return*/, response_handler_1["default"].ok(res, newTask, "Edit Success")];
            case 4:
                error_2 = _f.sent();
                return [2 /*return*/, response_handler_1["default"].error(res, error_2)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getAllTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allTask, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, task_model_1["default"].find({ isDeleted: false })];
            case 1:
                allTask = _a.sent();
                response_handler_1["default"].ok(res, allTask, "Get All Task Success");
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                response_handler_1["default"].error(res, err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTaskByOptions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var taskOption, filter, _a, status, sort, title, offset, limit, tasks, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                taskOption = {
                    sort: 1,
                    offset: 0,
                    limit: 100
                };
                filter = {};
                _a = req.query, status = _a.status, sort = _a.sort, title = _a.title, offset = _a.offset, limit = _a.limit;
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
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, task_model_1["default"].find(filter)
                        .limit(taskOption.limit)
                        .sort({ time: taskOption.sort })
                        .skip(taskOption.offset)
                        .select("-id -isDelected")];
            case 2:
                tasks = _b.sent();
                response_handler_1["default"].ok(res, tasks, "find sucess");
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                response_handler_1["default"].error(res, error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getTaskByOptions2 = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var taskOption, _a, status, sort, title, offset, limit, paging, tasksQuery, tasks, error_4;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                taskOption = {
                    isDeleted: false
                };
                _a = req.query, status = _a.status, sort = _a.sort, title = _a.title, offset = _a.offset, limit = _a.limit;
                if (title) {
                    taskOption.title = new RegExp(title, "i");
                }
                if (status) {
                    taskOption.status = status;
                }
                paging = pagination_1.getPagination(offset, limit);
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                tasksQuery = task_model_1["default"].find(taskOption)
                    .limit(paging.limit)
                    .skip(paging.skip)
                    .select("-__v -isDeleted");
                if (sort) {
                    tasksQuery.sort((_b = {}, _b[sort] = -1, _b));
                }
                return [4 /*yield*/, tasksQuery.exec()];
            case 2:
                tasks = _c.sent();
                response_handler_1["default"].ok(res, tasks, "find success");
                return [3 /*break*/, 4];
            case 3:
                error_4 = _c.sent();
                response_handler_1["default"].error(res, error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addUserToTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, taskId, user, task, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, userId = _a.userId, taskId = _a.taskId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_controller_1.getUserById(userId)];
            case 2:
                user = _b.sent();
                if (!user) {
                    response_handler_1["default"].notFound(res, "User not Found");
                }
                task = task_model_1["default"].findOne({ _id: taskId, isDeleted: false })
                    .then(function (data) {
                    console.log(data);
                    data.users.push(userId);
                    data.save();
                    return data;
                })
                    .then(function (docUpdate) {
                    response_handler_1["default"].ok(res, { docUpdate: docUpdate }, "Add user success");
                })["catch"](function (error) {
                    response_handler_1["default"].notFound(res, "Task not found: " + error);
                });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _b.sent();
                response_handler_1["default"].error(res, error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addUserToTask2 = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, taskId, user, task, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, userId = _a.userId, taskId = _a.taskId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_controller_1.getUserById(userId)];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, response_handler_1["default"].notFound(res, "User not Found")];
                }
                return [4 /*yield*/, task_model_1["default"].findOne({ _id: taskId, isDeleted: false })];
            case 3:
                task = _b.sent();
                if (task == null)
                    return [2 /*return*/, response_handler_1["default"].notFound(res, "Task not Found")];
                task.users.push(userId);
                task.save();
                response_handler_1["default"].ok(res, task, "Add user success");
                return [3 /*break*/, 5];
            case 4:
                error_6 = _b.sent();
                response_handler_1["default"].error(res, error_6);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.removeTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var taskId, task;
    return __generator(this, function (_a) {
        taskId = req.body.taskId;
        task = task_model_1["default"].findOne({ _id: taskId, isDeleted: false })
            .then(function (doc) {
            doc.isDeleted = true;
            doc.save();
            return doc;
        })
            .then(function (docremove) {
            response_handler_1["default"].ok(res, docremove, "remove success");
        })["catch"](function (error) {
            response_handler_1["default"].notFound(res, "task not found: " + error);
        });
        return [2 /*return*/];
    });
}); };
exports.removeTask2 = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var taskId, task, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                taskId = req.body.taskId;
                return [4 /*yield*/, task_model_1["default"].findOneAndUpdate({ _id: taskId, isDeleted: false }, { isDeleted: true })];
            case 1:
                task = _a.sent();
                if (!task)
                    return [2 /*return*/, response_handler_1["default"].notFound(res, "task not found")];
                response_handler_1["default"].ok(res, task, "remove success");
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                response_handler_1["default"].error(res, error_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
