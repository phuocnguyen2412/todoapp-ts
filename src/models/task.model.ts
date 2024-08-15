import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    users: [{ type: Types.ObjectId, ref: "User", required: true }],
    status: { type: String, enum: ["todo", "doing", "done"], required: true },
    isDeleted: { type: Boolean, default: false },
});

const Task = model("Task", taskSchema, "tasks");
export default Task;
