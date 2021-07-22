"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const throwError_1 = tslib_1.__importDefault(require("./throwError"));
function fetchApiCollection(config, request) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const matches = config.projectUrl.match(/(.+\/)project\/(\d+)\//);
        if (!matches) {
            return throwError_1.default("无法解析 projectUrl，请检查是否有误。");
        }
        const [, baseUrl, projectId] = matches;
        const apiUrl = `${baseUrl}api/plugin/export?type=json&pid=${projectId}&status=all&isWiki=false`;
        let apiCollection = yield request.get(apiUrl);
        return apiCollection;
    });
}
exports.default = fetchApiCollection;
