import { PublicClientApplication } from "@azure/msal-browser";
import {
  authConfig,
  AUTH_PROVIDER,
  GOOGLE_CONFIG,
  MICROSOFT_CONFIG,
  TOKEN_ACCESSOR_FOR_PROVIDER,
} from "src/config";
import { O_AUTH_DATA } from "src/model";
import {
  convertMsalError,
  getSearchQueryFromUrl,
  getSearchStringWithUrl,
  navigateToUrl,
} from "src/utils";
import { uniqId } from "src/utils";

function getRedirectUri(provider: AUTH_PROVIDER) {
  return `${window.location.origin}${authConfig.oauthPage.replace(
    ":provider",
    provider
  )}`;
}

// to generate a provider url.
// only supports for google, facebook, linkedin
// https://radzion.com/blog/social-auth
export function getProviderUrl(provider: AUTH_PROVIDER) {
  const providerUrls = {
    [AUTH_PROVIDER.GOOGLE]: getSearchStringWithUrl({
      url: GOOGLE_CONFIG.authUrl,
      query: {
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        redirect_uri: getRedirectUri(AUTH_PROVIDER.GOOGLE),
        scope: GOOGLE_CONFIG.scope,
        nonce: uniqId(),
        response_type: "id_token",
        access_type: "offline",
        prompt: "consent",
      },
    }),
  };
  return providerUrls[provider];
}

// social authentication
function googleAuthentication(): Promise<O_AUTH_DATA> {
  return new Promise(async (resolve, reject) => {
    try {
      const { query: searchQuery } = getSearchQueryFromUrl(
        window.location.href.replace("#", "?") // to consider fragment identifiers as query
      );
      const requiredToken = searchQuery[
        TOKEN_ACCESSOR_FOR_PROVIDER["google"]
      ] as string;
      // if required token is obtained, resolve the promise with the data we have
      if (requiredToken)
        resolve({ token: requiredToken, provider: AUTH_PROVIDER.GOOGLE });
      // else start the OAuth to obtain the required token
      else navigateToUrl(`${getProviderUrl(AUTH_PROVIDER.GOOGLE)}`);
    } catch (err) {
      reject(err);
    }
  });
}

// "@azure/msal-browser": "^2.28.1" -- install this to perform microsoft authentication
function microsoftAuthentication(): Promise<O_AUTH_DATA> {
  return new Promise(async (resolve, reject) => {
    const publicClientApplication = new PublicClientApplication({
      auth: {
        clientId: MICROSOFT_CONFIG.appId,
        redirectUri: getRedirectUri(AUTH_PROVIDER.MICROSOFT),
        authority: MICROSOFT_CONFIG.authority,
      },
      cache: {
        storeAuthStateInCookie: false,
      },
    });
    try {
      const data = await publicClientApplication.loginPopup({
        scopes: MICROSOFT_CONFIG.scopes,
        state: "microsoft",
        prompt: "select_account",
      });
      resolve({
        token: data[TOKEN_ACCESSOR_FOR_PROVIDER.microsoft],
        provider: AUTH_PROVIDER.MICROSOFT,
      });
    } catch (err) {
      // convert the error message to user readable form before rejecting it
      let error = convertMsalError(err);
      reject(error);
    }
    // clear the session storage to avoid session maintainance error
    sessionStorage.clear();
  });
}

export function socialAuth(provider: AUTH_PROVIDER) {
  switch (provider) {
    case AUTH_PROVIDER.GOOGLE:
      return googleAuthentication();
    case AUTH_PROVIDER.MICROSOFT:
      return microsoftAuthentication();
    default:
      throw new Error("Invalid Provider");
  }
}
