"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var throwError_1 = tslib_1.__importDefault(require("./throwError"));
function fetchApiCollection(config, request) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var matches, baseUrl, projectId, apiUrl, apiCollection;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    matches = config.projectUrl.match(/(.+\/)project\/(\d+)\//);
                    if (!matches) {
                        return [2 /*return*/, throwError_1.default("无法解析 projectUrl，请检查是否有误。")];
                    }
                    baseUrl = matches[1], projectId = matches[2];
                    apiUrl = baseUrl + "api/plugin/export?type=json&pid=" + projectId + "&status=all&isWiki=false";
                    return [4 /*yield*/, request.get(apiUrl)];
                case 1:
                    apiCollection = _a.sent();
                    return [2 /*return*/, apiCollection];
            }
        });
    });
}
exports.default = fetchApiCollection;
