import { ZObject, Bundle, HttpRequestOptions } from "zapier-platform-core";
import { combineURLs } from "../utils/request";

export const ensureJson = (request: HttpRequestOptions, z: ZObject) => {
  request.headers = request.headers || {};
  request.headers["Accept"] = "application/json";
  request.headers["Content-Type"] = "application/json";
  return request;
};

export const setAuthorizationHeaders = (
  request: HttpRequestOptions,
  z: ZObject,
  bundle: Bundle,
) => {
  request.headers = request.headers || {};
  if (bundle.authData.accessToken) {
    request.headers["Authorization"] = bundle.authData.accessToken;
  }
  return request;
};

export const setApiEndpoint = (request: HttpRequestOptions) => {
  const apiUrl = process.env.API_URL || "https://api.example.com/";
  request.url = combineURLs(apiUrl, request.url);
  return request;
};
