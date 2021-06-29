/// <reference types="request" />
import { Config } from "./types";
import rawRequest from "request-promise-native";
export declare function initRequest(config: Config): import("request").RequestAPI<rawRequest.RequestPromise<any>, rawRequest.RequestPromiseOptions, import("request").RequiredUriUrl>;
