"use strict";
exports.__esModule = true;
exports.getNextDate = void 0;
var milisUtcToVnTime = 7 * 3600 * 1000;
var milisInOneDay = 24 * 3600 * 1000;
exports.getNextDate = function () {
    var utc = new Date();
    var vtc = new Date(utc.getTime() + milisUtcToVnTime);
    var nextDate = new Date(vtc.getTime() + milisInOneDay);
    return nextDate;
};
