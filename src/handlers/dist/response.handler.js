"use strict";
exports.__esModule = true;
exports.error = exports.badRequest = exports.notFound = exports.unauthorize = exports.unauthenticate = exports.created = exports.ok = void 0;
var responseWithData = function (res, statusCode, data, message, isOk) { return res.status(statusCode).json({ isOk: isOk, data: data, message: message, statusCode: statusCode }); };
exports.ok = function (res, data, message) { return responseWithData(res, 200, data, message, true); };
exports.created = function (res, data, message) { return responseWithData(res, 201, data, message, true); };
exports.unauthenticate = function (res) {
    return responseWithData(res, 401, {}, "You have to login!", false);
};
exports.unauthorize = function (res) {
    return responseWithData(res, 403, {}, "You can't do that!", false);
};
exports.notFound = function (res, message) {
    return responseWithData(res, 404, [], message, false);
};
exports.badRequest = function (res, message) {
    return responseWithData(res, 400, {}, message, false);
};
exports.error = function (res, error) {
    return responseWithData(res, 500, error, "Error in server!", false);
};
var responseHandler = {
    ok: exports.ok,
    created: exports.created,
    unauthenticate: exports.unauthenticate,
    unauthorize: exports.unauthorize,
    notFound: exports.notFound,
    badRequest: exports.badRequest,
    error: exports.error
};
exports["default"] = responseHandler;
