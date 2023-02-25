import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { authConfig, gatewayConfig } from "src/config";
import {
  deleteCookie,
  getCookie,
  isAuthRoute,
  isPublicRoute,
  setCookie,
} from "src/utils";
import { authApi } from "src/api";
// import { socket } from "src/hooks";

interface IGateway {
  axiosInstance: AxiosInstance;
  setupHeadersForRequestInterceptors: (options?: {
    Authorization?: string;
    "x-refresh-token"?: string;
  }) => void;
  includeRefreshTokenLogic: () => void;
}

export class Gateway implements IGateway {
  public axiosInstance: AxiosInstance;
  constructor(
    config: AxiosRequestConfig<any> & { setupCustomizations?: boolean } = {}
  ) {
    const { setupCustomizations = true, ...rest } = config;
    this.axiosInstance = axios.create({
      baseURL: gatewayConfig.default,
      ...rest,
    });
    if (setupCustomizations) {
      this.setupHeadersForRequestInterceptors();
      this.includeRefreshTokenLogic();
    }
  }

  create() {
    return this.axiosInstance;
  }

  setupHeadersForRequestInterceptors(
    options: { Authorization?: string; "x-refresh-token"?: string } = {}
  ) {
    // setting token in header for each request
    this.axiosInstance.interceptors.request.use(
      (config) => {
        let token = getCookie(authConfig.tokenAccessor); // getting token from cookies
        let refreshToken = getCookie(authConfig.refreshTokenAccessor); // getting token from cookies
        if (token && config.headers) {
          // defaults
          config.headers["Authorization"] = `Bearer ${token}`;
          config.headers["x-refresh-token"] = refreshToken;
          // other (overwrites stuff if needed)
          Object.keys(options).forEach((key) => {
            config.headers[key] = options[key];
          });
          // update socket
          this.updateSocketToken(token);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // return this to call other functions when this function has been implemented and stored in a variable.
    return this;
  }

  includeRefreshTokenLogic() {
    // globally logout the user, if 401 occurs
    this.axiosInstance.interceptors.response.use(undefined, async (error) => {
      // logout if unauthenticated or token expired
      if (error.response?.status === 401) {
        const refreshToken = getCookie(authConfig.refreshTokenAccessor);
        // redirect to auth route, if you don't have the refreshToken and the current route is not public route
        if (!refreshToken) {
          deleteCookie(authConfig.tokenAccessor);
          if (
            !isPublicRoute(window.location.pathname) &&
            !isAuthRoute(window.location.pathname)
          ) {
            window.location.pathname = authConfig.authPage;
            return;
          }
        } else {
          // retry api call after getting access token using the refreshToken we have
          const apiCallConfig = error.config;
          try {
            const { accessToken } =
              await authApi.getAccessTokenFromRefreshToken(refreshToken);
            // update socket
            this.updateSocketToken(accessToken);
            // setup the new access token to cookie
            setCookie(authConfig.tokenAccessor, accessToken);
            const newGateway = new Gateway({ setupCustomizations: false })
              .setupHeadersForRequestInterceptors({
                Authorization: `Bearer ${accessToken}`,
                "x-refresh-token": refreshToken,
              })
              .create();
            const response = await newGateway(apiCallConfig);
            return Promise.resolve(response);
          } catch (err) {
            // this block will be triggered, if refresh token is expired too
            if (err.response?.status === 401) {
              deleteCookie(authConfig.tokenAccessor);
              deleteCookie(authConfig.refreshTokenAccessor);
              // at this point the user is completely not eligible to be logged in
              // redirect the user to auth route, if it's not auth route
              if (
                !isPublicRoute(window.location.pathname) &&
                !isAuthRoute(window.location.pathname)
              ) {
                window.location.pathname = authConfig.authPage;
                return;
              }
              return Promise.reject(err);
            }
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
        //   window.location.href = '/logout';
      }
      return Promise.reject(error);
    });
    // return this to call other functions when this function has been implemented and stored in a variable.
    return this;
  }

  updateSocketToken(token) {
    // // socket integration
    // //// update the socket client with the new token
    // socket.io.opts.query = {
    //   ...socket.io.opts.query,
    //   token,
    // };
    // //// reconnect the socket to use the updated token
    // socket.disconnect();
    // socket.connect();
  }
}

export const gateway = new Gateway().create();
