import axios, { AxiosError } from "axios";
import { authConfig, msalErrorMessageConfig } from "src/config";
import { API_HEADER_AUTH_DETAILS } from "src/model";
import { deleteCookie, getCookie, setCookie } from "./cookie-utils";
import { BrowserAuthError } from "@azure/msal-browser";

export const getError = (errorObject: Error | AxiosError) => {
  if (axios.isAxiosError(errorObject)) {
    let error: any = {
      message: "Failed to process your request",
      data: {},
      status: null,
      statusText: null,
    };
    if (errorObject) {
      let status = errorObject.response?.status;
      if (status === 404) {
        error = {
          ...errorObject.response,
          message: "Failed to process your request",
          status: 404,
        };
      } else {
        error = {
          ...errorObject.response,
          message:
            errorObject.response?.data["error"] ||
            errorObject.message ||
            "Failed to process your request",
        };
      }
    }
    return error;
  } else {
    return errorObject;
  }
};

// configuration to get upload progress(in percentage)

export const withUploadProgress = (callBack: Function) => {
  return {
    onUploadProgress: function (progressEvent: any) {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      callBack(percentCompleted);
    },
  };
};

export async function createApiFunction(
  apiCall: Function,
  successCallback?: any,
  errorCallback?: any
) {
  try {
    const response = await apiCall();
    if (successCallback) {
      return successCallback(response);
    }
    return response.data;
  } catch (err) {
    if (errorCallback) return errorCallback(err);
    throw err;
  }
}

// have a temporary authentication until the detail is fetched from api, then revert back to the original
export async function safeApiCall(
  apiCall: Function,
  details?: API_HEADER_AUTH_DETAILS
) {
  // if the details are provided, take a backup of existing auth details from cookies and replece them with
  // the new details provided
  const existingToken = getCookie(authConfig.tokenAccessor);
  const existingRefreshToken = getCookie(authConfig.refreshTokenAccessor);
  if (
    details &&
    details[authConfig.tokenAccessor] &&
    details[authConfig.refreshTokenAccessor]
  ) {
    setCookie(authConfig.tokenAccessor, details[authConfig.tokenAccessor]);
    setCookie(
      authConfig.refreshTokenAccessor,
      details[authConfig.refreshTokenAccessor]
    );
  }
  try {
    const response = await apiCall();
    // revert the changes in cookies
    if (existingToken) setCookie(authConfig.tokenAccessor, existingToken);
    else deleteCookie(authConfig.tokenAccessor);
    if (existingRefreshToken)
      setCookie(authConfig.refreshTokenAccessor, existingRefreshToken);
    else deleteCookie(authConfig.refreshTokenAccessor);
    return response;
  } catch (err) {
    // revert the changes in cookies
    if (existingToken) setCookie(authConfig.tokenAccessor, existingToken);
    else deleteCookie(authConfig.tokenAccessor);
    if (existingRefreshToken)
      setCookie(authConfig.refreshTokenAccessor, existingRefreshToken);
    else deleteCookie(authConfig.refreshTokenAccessor);
    throw err;
  }
}

export async function handleError(error, customFunction?: Function) {
  if (error) {
    if (customFunction) customFunction(error);
    else window.flash({ message: getError(error).message, variant: "error" });
  }
}

export function convertMsalError(error) {
  if (error && error instanceof BrowserAuthError) {
    const newError = new Error(
      msalErrorMessageConfig[getError(error).errorCode] ||
        "Failed to process your request"
    );
    return newError;
  }
  return error;
}

export async function rejectError(_error?: any) {
  return;
}
