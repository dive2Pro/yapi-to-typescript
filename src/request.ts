import { Config } from "./types";
import cookie from "cookie";
import { forOwn } from "vtils";
import rawRequest from "request-promise-native";

export function initRequest(config: Config) {
  const cookieJar = rawRequest.jar();
  if (config.extraCookies) {
    const cookies = cookie.parse(config.extraCookies);
    forOwn(cookies, (cookie, key) => {
      cookieJar.setCookie(`${key}=${cookie}`, config.url);
    });
  }
  const request = rawRequest.defaults({
    jar: cookieJar,
    json: true
  });
  return request;
}
