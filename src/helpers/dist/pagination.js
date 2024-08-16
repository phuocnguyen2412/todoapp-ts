"use strict";
exports.__esModule = true;
exports.getPagination = void 0;
function getPagination(page, limit) {
    if (page === void 0) { page = 1; }
    if (limit === void 0) { limit = 10; }
    var currentPage = Math.max(1, page);
    var maxLimit = Math.max(1, limit);
    var skip = (currentPage - 1) * maxLimit;
    return {
        skip: skip,
        limit: maxLimit
    };
}
exports.getPagination = getPagination;
