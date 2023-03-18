import {
  AUTH_DATA,
  REGISTER_PARAMS,
  ACCOUNTS_PROFILE_DETAILS,
  REGISTER_WITH_LIVE_APPS_ACCOUNT_RESPONSE,
} from "src/model";
import { createApiFunction } from "src/utils";
import { authGateway, gateway } from "src/api";
import { platformConfig } from "src/config";

class UserApi {
  fetchProfile(): Promise<AUTH_DATA> {
    return createApiFunction(() => gateway.get("/user/profile"));
  }
  fetchAccountsProfile(): Promise<ACCOUNTS_PROFILE_DETAILS> {
    return createApiFunction(() =>
      authGateway.get(`${platformConfig.accounts}/profile`)
    );
  }
  registerWithLiveCord(
    registerData: REGISTER_PARAMS
  ): Promise<REGISTER_WITH_LIVE_APPS_ACCOUNT_RESPONSE> {
    return createApiFunction(() =>
      authGateway.post(
        `${platformConfig.accounts}/apps/register/live_cord`,
        registerData
      )
    );
  }
}

export const userApi = new UserApi();
