import { AUTH_DATA } from "src/model";
import { createApiFunction } from "src/utils";
import { gateway } from "src/api";

class UserApi {
  fetchProfile(): Promise<AUTH_DATA> {
    return createApiFunction(() => gateway.get("/user/profile"));
  }
}

export const userApi = new UserApi();
