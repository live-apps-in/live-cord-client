import { AUTH_DATA, LOGIN_AUTH_PROPS } from "src/model";
import { axiosInstance, createApiFunction } from "src/utils";

class AuthApi {
  login(loginData: LOGIN_AUTH_PROPS): Promise<AUTH_DATA> {
    return createApiFunction(() =>
      axiosInstance.post("/auth/signin", loginData)
    );
  }
  initialize(): Promise<AUTH_DATA> {
    return createApiFunction(() => axiosInstance.get("/auth/refresh"));
  }
  logout(): Promise<void> {
    return createApiFunction(() => axiosInstance.get("/auth/logout"));
  }
  oAuth(loginData: any): Promise<AUTH_DATA> {
    return createApiFunction(() =>
      axiosInstance.post("/auth/social", loginData)
    );
  }
}

export const authApi = new AuthApi();
