import { USER_PROFILE } from "src/model";
import { createApiFunction } from "src/utils";
import { gateway } from "src/api";

class UserApi {
  fetchProfile(): Promise<USER_PROFILE> {
    return createApiFunction(() => gateway.get("/user/profile"));
  }
}

export const userApi = new UserApi();
