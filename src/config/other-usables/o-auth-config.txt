// provider info

export enum AUTH_PROVIDER {
  GOOGLE = "google",
  MICROSOFT = "microsoft",
}

export const GOOGLE_CONFIG = {
  clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  clientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
  authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
  scope:
    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
};

export const MICROSOFT_CONFIG = {
  appId: process.env.REACT_APP_MICROSOFT_APP_ID,
  tenantId: process.env.REACT_APP_MICROSOFT_TENANT_ID,
  authority: "https://login.microsoftonline.com/aveoninfotech.com",
  scopes: ["user.read"],
};

export const TOKEN_ACCESSOR_FOR_PROVIDER = {
  google: "id_token",
  microsoft: "accessToken",
};
