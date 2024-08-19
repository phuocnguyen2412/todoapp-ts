"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1["default"].Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    account: {
        type: {
            password: { type: String, required: true },
            otp: {
                type: String,
                "default": null
            },
            otpExp: {
                type: Date,
                "default": null
            }
        },
        required: true
    },
    isValidated: { type: Boolean, "default": false }
});
var User = mongoose_1["default"].model("User", userSchema, "users");
exports["default"] = User;
