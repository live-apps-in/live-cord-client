import { authApi, socialAuthApi, userApi } from "src/api";
import { authConfig } from "src/config";
import { useActions, useSelector } from "src/hooks";
import {
  USE_AUTH_OPTIONS,
  AUTH_DATA,
  LOGIN_AUTH_PROPS,
  SOCIAL_AUTH_PARAMS,
  SOCIAL_AUTH_PROVIDER,
} from "src/model";
import { deleteCookie, getCookie, setCookie } from "src/utils";

export const useAuth = () => {
  const { authActions, userActions } = useActions();
  const { auth } = useSelector((state) => state);

  function initialize({
    updateRedux = true,
  }: USE_AUTH_OPTIONS = {}): Promise<AUTH_DATA> {
    return new Promise(async (resolve, reject) => {
      try {
        // const data: any = {
        //   token: "test",
        //   role: "member",
        //   name: "Test",
        //   user_name: "test",
        //   email: "test@mailinator.com",
        //   _id: "test",
        // };
        const token = getCookie(authConfig.tokenAccessor);
        if (!token) {
          deleteCookie(authConfig.refreshTokenAccessor);
          throw new Error("Session expired");
        }
        // initialize the app by fetching details from profile route (initialize function is replaced by profile route)
        const data = await userApi.fetchProfile();
        // const data = { role: "member" } as any;
        data.role = "member";
        if (updateRedux) {
          authActions.initialize({ data, isAuthenticated: true });
          userActions.setProfile(data);
        }
        resolve(data);
      } catch (err) {
        if (updateRedux) authActions.logout();
        reject(err);
      }
    });
  }

  function registerWithLiveAccounts(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const accountsProfileDetails = await userApi.fetchAccountsProfile();
        if (accountsProfileDetails.apps?.live_cord?.isActive) {
          // already registered with live apps
          resolve();
        } else {
          // not registered with live apps, so register the user here with details from accounts profile
          await userApi.registerWithLiveCord({
            name: accountsProfileDetails.name,
            email: accountsProfileDetails.email,
          });
          resolve();
        }
      } catch (err) {
        if (err.response.status === 409) resolve();
        else reject(err);
      }
    });
  }

  function login(
    loginData: LOGIN_AUTH_PROPS,
    { updateRedux = true }: USE_AUTH_OPTIONS = {}
  ): Promise<AUTH_DATA> {
    return new Promise(async (resolve, reject) => {
      try {
        setCookie(authConfig.tokenAccessor, loginData.token);
        setCookie(authConfig.refreshTokenAccessor, loginData.refreshToken);
        // register the user with live apps
        await registerWithLiveAccounts();
        // fetch the user's details from the profile route of live cord api
        const data = await userApi.fetchProfile();
        // const data = { role: "member" } as any;
        data.role = "member";
        if (updateRedux) {
          authActions.login(data);
          userActions.setProfile(data);
        }
        resolve(data);
      } catch (err) {
        deleteCookie(authConfig.tokenAccessor);
        deleteCookie(authConfig.refreshTokenAccessor);
        reject(err);
      }
    });
  }

  function socialAuth(socialAuthData: SOCIAL_AUTH_PARAMS): Promise<AUTH_DATA> {
    return new Promise(async (resolve, reject) => {
      try {
        let data: AUTH_DATA;
        switch (socialAuthData.provider) {
          case SOCIAL_AUTH_PROVIDER.DISCORD:
            data = await socialAuthApi.discord(socialAuthData);
            break;
          default:
            throw new Error("Invalid Provider");
        }
        // check if discord connection is successful by checking the refetched profile details from backend
        if (data?.discord) {
          authActions.discordLogin(data?.discord);
          resolve({ ...auth.data, ...data });
        } else {
          throw new Error("Failed to connect with Discord");
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  function logout({
    updateRedux = true,
  }: USE_AUTH_OPTIONS = {}): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await authApi.logout();
        deleteCookie(authConfig.tokenAccessor);
        window.location.reload();
        if (updateRedux) authActions.logout();
        resolve();
      } catch (err) {
        if (updateRedux) authActions.logout();
        deleteCookie(authConfig.tokenAccessor);
        window.location.reload();
        reject(err);
      }
    });
  }

  return {
    ...auth,
    login,
    socialAuth,
    initialize,
    logout,
  };
};
