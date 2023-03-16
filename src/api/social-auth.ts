import { DISCORD_AUTH_PARAMS } from "src/model";
import { createApiFunction, getSearchString } from "src/utils";
import { gateway } from "./gateway";

class SocialAuthApi {
  discord(loginData: DISCORD_AUTH_PARAMS) {
    return createApiFunction(() =>
      gateway.get(`/auth/discord?${getSearchString(loginData)}`)
    );
  }
}

export const socialAuthApi = new SocialAuthApi();
