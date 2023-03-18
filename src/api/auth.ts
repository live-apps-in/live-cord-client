import {
  API_HEADER_AUTH_DETAILS,
  AUTH_DATA,
  DISCORD_AUTH_PARAMS,
  LOGIN_AUTH_PROPS,
} from "src/model";
import { createApiFunction, getSearchString } from "src/utils";
import { gateway, Gateway } from "./gateway";

class AuthApi {
  getAccessTokenFromRefreshToken(
    refreshToken: API_HEADER_AUTH_DETAILS["refreshToken"]
  ): Promise<{ accessToken: API_HEADER_AUTH_DETAILS["token"] }> {
    const customGateway = new Gateway({ setupCustomizations: false })
      .setupHeadersForRequestInterceptors({ "x-refresh-token": refreshToken })
      .create();
    return createApiFunction(() =>
      // use a new gateway instead of existing gateway to not include the refresh token logic for this api call
      // else it will create an infinite loop
      customGateway.get("/auth/token/refresh")
    );
  }
  login(loginData: LOGIN_AUTH_PROPS): Promise<AUTH_DATA> {
    return createApiFunction(() => gateway.post("/auth/signin", loginData));
  }
  initialize(): Promise<AUTH_DATA> {
    return createApiFunction(() => gateway.get("/auth/refresh"));
  }
  connectToDiscord(code: DISCORD_AUTH_PARAMS["code"]) {
    return createApiFunction(() =>
      gateway.get(`/auth/discord?${getSearchString({ code })}`)
    );
  }
  logout(): Promise<void> {
    return createApiFunction(() => gateway.get("/auth/logout"));
  }
}

export const authApi = new AuthApi();
