"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema, model = mongoose_1["default"].model, Types = mongoose_1["default"].Types;
var taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    users: [{ type: Types.ObjectId, ref: "User", required: true, "default": [] }],
    status: { type: String, "enum": ["todo", "doing", "done"], required: true },
    isDeleted: { type: Boolean, "default": false },
    time: { type: Date, "default": new Date() }
});
var Task = model("Task", taskSchema, "tasks");
exports["default"] = Task;
