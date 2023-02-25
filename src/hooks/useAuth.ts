import { useParams } from "react-router-dom";
import { authApi, socialAuth, userApi } from "src/api";
import { authConfig, AUTH_PROVIDER } from "src/config";
import { useActions, useSelector } from "src/hooks";
import {
  USE_AUTH_OPTIONS,
  AUTH_DATA,
  LOGIN_AUTH_PROPS,
  USE_O_AUTH_RETURN_TYPE,
  USE_AUTH_RETURN_TYPE,
  USE_AUTH_PARAMS,
  USER_PROFILE,
} from "src/model";
import { deleteCookie, getCookie, setCookie } from "src/utils";

// TODO: conditional typing for return typing (if isOAuth === true then USE_O_AUTH_RETURN_TYPE else USE_AUTH_RETURN_TYPE)
export const useAuth = <T>({
  isOAuth = false,
}: USE_AUTH_PARAMS = {}): T extends true
  ? USE_O_AUTH_RETURN_TYPE
  : USE_AUTH_RETURN_TYPE => {
  const { authActions, userActions } = useActions();
  const { auth } = useSelector((state) => state);
  const params = useParams();

  function getOAuthUrl(provider: AUTH_PROVIDER): string {
    return authConfig.oauthPage.replace(":provider", provider);
  }

  function fetchProfile({
    updateRedux = true,
  }: USE_AUTH_OPTIONS = {}): Promise<USER_PROFILE> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await userApi.fetchProfile();
        if (updateRedux) userActions.setProfile(data);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  // our api to make a social authentication
  function handleOAuthLogin(response): Promise<AUTH_DATA> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await authApi.oAuth(response);
        if (!data.token) throw new Error("Failed to authenticate");
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  function initialize({
    updateRedux = true,
  }: USE_AUTH_OPTIONS = {}): Promise<AUTH_DATA> {
    return new Promise(async (resolve, reject) => {
      try {
        // const data: any = {
        //   name: "Dikshit",
        //   user_name: "dikshit-n",
        //   tag: "1234",
        //   email: "dikshit@aveoninfotech.com",
        //   token: "test_token",
        //   role: "ping_user",
        //   _id: "test_id",
        //   image: null,
        // };
        // authActions.initialize({ data, isAuthenticated: true });
        const token = getCookie(authConfig.tokenAccessor);
        if (!token) throw new Error("Session expired");
        const data = await authApi.initialize();
        if (!data.token) throw new Error("Failed to authenticate");
        if (updateRedux)
          authActions.initialize({ data, isAuthenticated: true });
        // once the initialization is successful, fetch the profile right away
        await fetchProfile();
        resolve(data);
      } catch (err) {
        if (updateRedux) authActions.logout();
        deleteCookie(authConfig.tokenAccessor);
        reject(err);
      }
    });
  }

  function login(
    loginData: LOGIN_AUTH_PROPS,
    { updateRedux = true }: USE_AUTH_OPTIONS = {}
  ): Promise<AUTH_DATA> {
    return new Promise(async (resolve, reject) => {
      try {
        // const data: any = {
        //   name: "Dikshit",
        //   user_name: "dikshit-n",
        //   tag: "1234",
        //   email: "dikshit@aveoninfotech.com",
        //   token: "test_token",
        //   role: "ping_user",
        //   _id: "test_id",
        //   image: null,
        // };
        // authActions.login(data);
        const data = await authApi.login(loginData);
        if (!data.token) throw new Error("Failed to authenticate");
        if (updateRedux) authActions.login(data);
        setCookie(authConfig.tokenAccessor, data.token);
        // once the login is successful, fetch the profile right away
        await fetchProfile();
        resolve(data);
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

  // only works for OAuth type
  // same function for both signin and signup with social account
  function authenticate({
    updateRedux = true,
  }: USE_AUTH_OPTIONS = {}): Promise<AUTH_DATA> {
    return new Promise(async (resolve, reject) => {
      const provider = params?.provider as AUTH_PROVIDER;
      try {
        const socialAuthData = await socialAuth(provider);
        const data = await handleOAuthLogin(socialAuthData);
        if (updateRedux) authActions.login(data);
        setCookie(authConfig.tokenAccessor, data.token);
        if (updateRedux) authActions.login(data);
        // once the authentication is successful, fetch the profile right away
        await fetchProfile();
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  if (isOAuth)
    return { ...auth, authenticate, initialize, logout, getOAuthUrl } as any;
  return { ...auth, login, initialize, logout } as any;
};
