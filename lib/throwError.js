"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
/**
 * 抛出错误。
 *
 * @param msg 错误信息
 */
function throwError(...msg) {
    throw new Error(chalk_1.default.red(msg.join('')));
}
exports.default = throwError;
