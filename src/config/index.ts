import DefaultAvatar from "src/assets/img/png/default-avatar.png";
import { getSearchString } from "src/utils";

export const authConfig = {
  authPage: "/auth", // exact page where the user will be redirected if not loggedin
  signupPage: "/auth/signup",
  oauthPage: "/auth/oauth/:provider",
  discordOAuthPage: "/oauth2/authorize",
  liveAppsPortal: process.env.REACT_APP_LIVE_APPS_PORTAL,
  homePage: "/",
  tokenAccessor: "token",
  refreshTokenAccessor: "refreshToken",
};

// #rbac-setup
export const rbacConfig = {
  roles: ["admin", "member"],
  homePage: {
    admin: "/admin",
    member: "/member",
    public: "/public",
  },
  publicRoutes: ["/verification"],
  authRoutes: ["/auth", "/auth/login"], // pages that are used for authentication purposes
};

export const projectConfig = {
  title: "Live Cord",
  defaultTheme: "pure-light-theme",
  defaultPhonenumberCountry: "IN" as any,
  appBaseurl: window.location.origin,
  // defaultTheme: THEME_NAMES.PureLightTheme,
};

export const gatewayConfig = {
  default: "https://api.livecord.jaga.live",
  auth: "https://api.accounts.jaga.live",
};

export const platformConfig = {
  accounts: "accounts",
  ping: "ping",
};

// image config
export const imageConfig = {
  defaultAvatarSrc: "src/assets/img/png/default-avatar.png",
  defaultAvatar: DefaultAvatar,
};

// msal
export const msalErrorMessageConfig = {
  interaction_in_progress: "A popup is already open",
  user_cancelled: "Authentication Cancelled",
};

//discord
export const discordConfig = {
  baseUrl: process.env.REACT_APP_DISCORD_BASE_URL,
  applicationId: process.env.REACT_APP_DISCORD_APPLICATION_ID,
  clientId: process.env.REACT_APP_DISCORD_CLIENT_ID,
  scopes: process.env.REACT_APP_DISCORD_SCOPES,
  // redirectURL: process.env.REACT_APP_DISCORD_REDIRECT_URL,
  redirectURL: "http://localhost:3000/auth",
  configuredUrl: `${process.env.REACT_APP_DISCORD_BASE_URL}${
    authConfig.discordOAuthPage
  }?${getSearchString({
    client_id: process.env.REACT_APP_DISCORD_CLIENT_ID,
    application_id: process.env.REACT_APP_DISCORD_APPLICATION_ID,
    scopes: process.env.REACT_APP_DISCORD_SCOPES,
  })}`,
};

export * from "./constants";
