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
exports.removeTask = exports.addUserToTask = exports.removeUserFromTask = exports.getTaskByOptions = exports.getAllTask = exports.editTask = exports.addTask = void 0;
var mongoose_1 = require("mongoose");
var response_handler_1 = require("../../handlers/response.handler");
var validation_handler_1 = require("../../handlers/validation.handler");
var task_model_1 = require("../../models/task.model");
var getDate_1 = require("./../../helpers/getDate");
var pagination_1 = require("../../helpers/pagination");
var user_model_1 = require("../../models/user.model");
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
    var validateEditTaskResult, taskId, isExistTask, isExistOldTask, _a, _b, status, _c, title, _d, description, _e, users, _f, time, updatedTask, error_2;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 4, , 5]);
                validateEditTaskResult = validation_handler_1.validateBody(req);
                if (validateEditTaskResult.length > 0) {
                    return [2 /*return*/, response_handler_1["default"].badRequest(res, validateEditTaskResult)];
                }
                taskId = req.params.id;
                if (!mongoose_1.Types.ObjectId.isValid(taskId)) {
                    return [2 /*return*/, response_handler_1["default"].notFound(res, "Invalid Id")];
                }
                return [4 /*yield*/, task_model_1["default"].findById(taskId)];
            case 1:
                isExistTask = _g.sent();
                if (!isExistTask) {
                    return [2 /*return*/, response_handler_1["default"].notFound(res, "Task Id not Found")];
                }
                return [4 /*yield*/, task_model_1["default"].findOne({
                        _id: taskId,
                        isDeleted: false
                    })];
            case 2:
                isExistOldTask = _g.sent();
                if (!isExistOldTask) {
                    return [2 /*return*/, response_handler_1["default"].notFound(res, "Task not Found")];
                }
                _a = req.body, _b = _a.status, status = _b === void 0 ? isExistTask.status : _b, _c = _a.title, title = _c === void 0 ? isExistOldTask.title : _c, _d = _a.description, description = _d === void 0 ? isExistOldTask.description : _d, _e = _a.users, users = _e === void 0 ? isExistOldTask.users : _e, _f = _a.time, time = _f === void 0 ? isExistOldTask.time : _f;
                console.log(status);
                return [4 /*yield*/, task_model_1["default"].findByIdAndUpdate(taskId, {
                        status: status,
                        title: title,
                        description: description,
                        users: users,
                        time: time
                    })];
            case 3:
                updatedTask = _g.sent();
                if (updatedTask == null)
                    return [2 /*return*/, response_handler_1["default"].badRequest(res, "Task not found")];
                return [2 /*return*/, response_handler_1["default"].ok(res, updatedTask, "Edit Success")];
            case 4:
                error_2 = _g.sent();
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
                return [4 /*yield*/, task_model_1["default"].find({ isDeleted: false }).populate("users", "_id name")];
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
    var taskOption, _a, status, sort, title, offset, limit, paging, sortOption, tasks, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                taskOption = {
                    isDeleted: false
                };
                _a = req.query, status = _a.status, sort = _a.sort, title = _a.title, offset = _a.offset, limit = _a.limit;
                paging = pagination_1.getPagination(offset, limit);
                if (title) {
                    taskOption.title = new RegExp(title, "i");
                }
                if (status) {
                    taskOption.status = status;
                }
                sortOption = {};
                if (sort) {
                    sortOption[sort] = 1;
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, task_model_1["default"].find(taskOption)
                        .populate("users", "_id name")
                        .limit(paging.limit)
                        .skip(paging.skip)
                        .sort(sortOption)
                        .select("-v -isDeleted")];
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
exports.removeUserFromTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, taskId, user, isExistTask, isExistUserInTask, newUser, newTaskAfterRemoveUser, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, userId = _a.userId, taskId = _a.taskId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, user_model_1["default"].findById(userId)];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, response_handler_1["default"].notFound(res, "User not Found by ID")];
                }
                return [4 /*yield*/, task_model_1["default"].findOne({
                        _id: taskId,
                        isDeleted: false
                    })];
            case 3:
                isExistTask = _b.sent();
                if (!isExistTask) {
                    return [2 /*return*/, response_handler_1["default"].notFound(res, "Task not Found")];
                }
                if (isExistTask.status == "done") {
                    return [2 /*return*/, response_handler_1["default"].notFound(res, "Task has done already")];
                }
                isExistUserInTask = isExistTask.users.some(function (_userId) {
                    if (_userId.toString() === userId.toString()) {
                        return true;
                    }
                });
                if (!isExistUserInTask) {
                    return [2 /*return*/, response_handler_1["default"].notFound(res, "User not Found in Task")];
                }
                newUser = isExistTask.users.filter(function (_userId) { return _userId.toString() !== userId.toString(); });
                return [4 /*yield*/, task_model_1["default"].findOneAndUpdate({ _id: taskId, isDeleted: false }, { users: newUser }, { "new": true })];
            case 4:
                newTaskAfterRemoveUser = _b.sent();
                if (!newTaskAfterRemoveUser) {
                    return [2 /*return*/, response_handler_1["default"].notFound(res, "Task After Remove User not Found")];
                }
                return [2 /*return*/, response_handler_1["default"].ok(res, newTaskAfterRemoveUser, "Remove Uer success")];
            case 5:
                error_4 = _b.sent();
                return [2 /*return*/, response_handler_1["default"].error(res, error_4)];
            case 6: return [2 /*return*/];
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
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_model_1["default"].findById(userId)];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, response_handler_1["default"].notFound(res, "User not Found")];
                }
                return [4 /*yield*/, task_model_1["default"].findOne({ _id: taskId, isDeleted: false })];
            case 3:
                task = _b.sent();
                if (!task)
                    return [2 /*return*/, response_handler_1["default"].notFound(res, "Task notFound")];
                if (task.users.toString().includes(userId.toString())) {
                    return [2 /*return*/, response_handler_1["default"].notFound(res, "user is already exists")];
                }
                task.users.push(userId);
                task.save();
                response_handler_1["default"].ok(res, task, "Add user success");
                return [3 /*break*/, 5];
            case 4:
                error_5 = _b.sent();
                response_handler_1["default"].error(res, error_5);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.removeTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var taskId, task, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskId = req.body.taskId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, task_model_1["default"].findOneAndUpdate({ _id: taskId, isDeleted: false }, { isDeleted: true })];
            case 2:
                task = _a.sent();
                if (!task)
                    return [2 /*return*/, response_handler_1["default"].notFound(res, "task not found")];
                response_handler_1["default"].ok(res, { task: task }, "Remove Success");
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                response_handler_1["default"].error(res, error_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
