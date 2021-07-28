"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterfaceType = exports.ResponseBodyType = exports.RequestFormItemType = exports.RequestBodyType = exports.Required = exports.Method = void 0;
// 参考：https://github.com/YMFE/yapi/blob/master/server/models/interface.js#L9
/** 请求方式 */
var Method;
(function (Method) {
    Method["GET"] = "GET";
    Method["POST"] = "POST";
    Method["PUT"] = "PUT";
    Method["DELETE"] = "DELETE";
    Method["HEAD"] = "HEAD";
    Method["OPTIONS"] = "OPTIONS";
    Method["PATCH"] = "PATCH";
})(Method = exports.Method || (exports.Method = {}));
/** 是否必需 */
var Required;
(function (Required) {
    /** 不必需 */
    Required["False"] = "0";
    /** 必需 */
    Required["True"] = "1";
})(Required = exports.Required || (exports.Required = {}));
/** 请求数据类型 */
var RequestBodyType;
(function (RequestBodyType) {
    /** 查询字符串 */
    RequestBodyType["Query"] = "query";
    /** 表单 */
    RequestBodyType["Form"] = "form";
    /** JSON */
    RequestBodyType["Json"] = "json";
    /** 纯文本 */
    RequestBodyType["Text"] = "text";
    /** 文件 */
    RequestBodyType["File"] = "file";
    /** 原始数据 */
    RequestBodyType["Raw"] = "raw";
})(RequestBodyType = exports.RequestBodyType || (exports.RequestBodyType = {}));
/** 请求表单条目类型 */
var RequestFormItemType;
(function (RequestFormItemType) {
    RequestFormItemType["Text"] = "text";
    RequestFormItemType["File"] = "file";
})(RequestFormItemType = exports.RequestFormItemType || (exports.RequestFormItemType = {}));
/** 返回数据类型 */
var ResponseBodyType;
(function (ResponseBodyType) {
    ResponseBodyType["Json"] = "json";
    ResponseBodyType["Text"] = "text";
    ResponseBodyType["Xml"] = "xml";
    ResponseBodyType["Raw"] = "raw";
    ResponseBodyType["JsonSchema"] = "json-schema";
})(ResponseBodyType = exports.ResponseBodyType || (exports.ResponseBodyType = {}));
/** 接口类型 */
var InterfaceType;
(function (InterfaceType) {
    /** 请求 */
    InterfaceType[InterfaceType["Request"] = 0] = "Request";
    /** 响应 */
    InterfaceType[InterfaceType["Response"] = 1] = "Response";
})(InterfaceType = exports.InterfaceType || (exports.InterfaceType = {}));
