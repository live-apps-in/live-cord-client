import DefaultAvatar from "src/assets/img/png/default-avatar.png";

export const authConfig = {
  authPage: "/auth", // exact page where the user will be redirected if not loggedin
  signupPage: "/auth/signup",
  oauthPage: "/auth/oauth/:provider",
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
  default: "https://api.ping.jaga.live",
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

// socket config
export const socketConfig = {
  url: "https://api.livecord.jaga.live",
  //   url: "0.tcp.in.ngrok.io:17672",
};

// msal
export const msalErrorMessageConfig = {
  interaction_in_progress: "A popup is already open",
  user_cancelled: "Authentication Cancelled",
};

export * from "./constants";
