"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
/**
 * 抛出错误。
 *
 * @param msg 错误信息
 */
function throwError() {
    var msg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msg[_i] = arguments[_i];
    }
    throw new Error(chalk_1.default.red(msg.join('')));
}
exports.default = throwError;
