import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    account: {
        type: {
            password: { type: String, required: true },
            otp: {
                type: String,
                default: null,
            },
            otpExp: {
                type: Date,
                default: null,
            },
        },
        required: true,
    },
});
const User = mongoose.model("User", userSchema, "users");
export default User;
