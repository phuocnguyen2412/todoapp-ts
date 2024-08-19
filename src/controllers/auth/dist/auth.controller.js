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
exports.confirmOtp = exports.register = exports.login = void 0;
var user_model_1 = require("../../models/user.model");
var jwtToken_1 = require("../../helpers/jwtToken");
var hashPassword_1 = require("../../helpers/hashPassword");
var response_handler_1 = require("../../handlers/response.handler");
var console_1 = require("console");
var validation_handler_1 = require("../../handlers/validation.handler");
var genOTP_1 = require("../../helpers/genOTP");
var sendOtpEmail_1 = require("../../helpers/sendOtpEmail");
exports.login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validateResult, _a, email, password, user, otp, otpExp, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                validateResult = validation_handler_1.validateBody(req);
                if (validateResult.length > 0)
                    return [2 /*return*/, response_handler_1["default"].badRequest(res, validateResult)];
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_model_1["default"].findOne({
                        email: email
                    })];
            case 1:
                user = _b.sent();
                if (user === null)
                    return [2 /*return*/, response_handler_1["default"].badRequest(res, "Not found your account!")];
                return [4 /*yield*/, hashPassword_1.comparePassword(password, user.account.password)];
            case 2:
                if ((_b.sent()) === false)
                    return [2 /*return*/, response_handler_1["default"].notFound(res, "Wrong password!")];
                if (!(user.isValidated == false)) return [3 /*break*/, 4];
                otp = genOTP_1.genOTP().toString();
                otpExp = genOTP_1.genOTPExpired();
                user.account.otp = otp;
                user.account.otpExp = otpExp;
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                sendOtpEmail_1.sendOtpEmail({ email: user.email, name: user.name, otp: otp });
                return [2 /*return*/, response_handler_1["default"].badRequestWithData(res, "Please validate your account", { acessToken: jwtToken_1.generateToken(user.id), _id: user.id })];
            case 4:
                response_handler_1["default"].ok(res, {
                    accessToken: jwtToken_1.generateToken(user.id)
                }, "Đăng nhập thành công");
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                console_1.log(error_1);
                response_handler_1["default"].error(res, error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, name, checkDuplicate, otp, otpExpired, userData, user, _b, _c, _d, _e, error_2, error_3;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 7, , 8]);
                _a = req.body, email = _a.email, password = _a.password, name = _a.name;
                checkDuplicate = user_model_1["default"].findOne({ email: email });
                if (checkDuplicate != null)
                    return [2 /*return*/, response_handler_1["default"].badRequest(res, "Đã tồn tại tài khoản")];
                otp = genOTP_1.genOTP();
                otpExpired = genOTP_1.genOTPExpired();
                userData = {
                    email: email,
                    name: name,
                    otp: otp.toString()
                };
                _c = (_b = user_model_1["default"]).create;
                _d = {
                    email: email,
                    name: name
                };
                _e = {};
                return [4 /*yield*/, hashPassword_1.hashPassword(password)];
            case 1: return [4 /*yield*/, _c.apply(_b, [(_d.account = (_e.password = _f.sent(),
                        _e.otp = otp.toString(),
                        _e.otpExp = otpExpired,
                        _e),
                        _d.isValidated = false,
                        _d)])];
            case 2:
                user = _f.sent();
                response_handler_1["default"].created(res, {
                    accessToken: jwtToken_1.generateToken(user.id)
                }, "Đăng ký thành công, hãy xác thực tài khoản");
                _f.label = 3;
            case 3:
                _f.trys.push([3, 5, , 6]);
                return [4 /*yield*/, sendOtpEmail_1.sendOtpEmail(userData)];
            case 4:
                _f.sent();
                return [3 /*break*/, 6];
            case 5:
                error_2 = _f.sent();
                response_handler_1["default"].error(res, error_2);
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 8];
            case 7:
                error_3 = _f.sent();
                response_handler_1["default"].error(res, error_3);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.confirmOtp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, otpConfirm, user, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, userId = _a.userId, otpConfirm = _a.otpConfirm;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                return [4 /*yield*/, user_model_1["default"].findById(userId)];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, response_handler_1["default"].notFound(res, "User not found")];
                }
                if (!user.account.otp) {
                    return [2 /*return*/, response_handler_1["default"].notFound(res, "fail to confirm otp")];
                }
                if (!(user.account.otp == otpConfirm)) return [3 /*break*/, 5];
                return [4 /*yield*/, user_model_1["default"].findByIdAndUpdate(userId, {
                        $set: { "account.otp": null, "account.otpExp": null }
                    })];
            case 3:
                _b.sent();
                user.isValidated = true;
                return [4 /*yield*/, user.save()];
            case 4:
                _b.sent();
                return [2 /*return*/, response_handler_1["default"].ok(res, {}, "Otp is confirmed and account validated ")];
            case 5: return [2 /*return*/, response_handler_1["default"].unauthenticate(res, "Invalid Otp")];
            case 6: return [3 /*break*/, 8];
            case 7:
                error_4 = _b.sent();
                return [2 /*return*/, response_handler_1["default"].error(res, error_4)];
            case 8: return [2 /*return*/];
        }
    });
}); };
