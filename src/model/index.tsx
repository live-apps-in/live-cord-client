// redux
// #rbac-setup
export type ROLE = "admin" | "member";

export interface AUTH_DATA {
  token: string;
  role: ROLE;
  image?: any;
  name: string;
  user_name: string;
  user_tag: string;
  email: string;
  _id: string;
}

export interface AUTH_STATE {
  isInitialized: boolean;
  isAuthenticated: boolean;
  data: AUTH_DATA | null;
}

export interface INITIALIZE_ACTION {
  isAuthenticated: boolean;
  data: AUTH_DATA | null;
}

// hooks
// auth
export interface USE_AUTH_OPTIONS {
  updateRedux?: boolean;
}

export type LOGIN_AUTH_PROPS = {
  token: string;
  refreshToken: string;
};

export interface LIVE_APPS_AUTH_RETURN_URL_PARAMS extends LOGIN_AUTH_PROPS {
  backtoURL?: string;
  signup?: boolean;
}

export interface USE_AUTH_RETURN_TYPE extends AUTH_STATE {
  initialize: (options?: USE_AUTH_OPTIONS) => Promise<AUTH_DATA>;
  login: (
    loginData?: LOGIN_AUTH_PROPS,
    options?: USE_AUTH_OPTIONS
  ) => Promise<AUTH_DATA>;
  logout: (options?: USE_AUTH_OPTIONS) => Promise<void>;
}

// user-api
// export type REGISTER_USER_DETAILS = {
//   name: AUTH_DATA["name"];
//   email: AUTH_DATA["email"];
//   user_name: AUTH_DATA["user_name"];
//   user_tag: AUTH_DATA["user_tag"];
//   token?: API_HEADER_AUTH_DETAILS["token"];
//   refreshToken?: API_HEADER_AUTH_DETAILS["refreshToken"];
// };

export type API_HEADER_AUTH_DETAILS = {
  token: string;
  refreshToken: string;
};

// live apps auth
//.. login
export type LIVE_APPS_LOGIN_DETAILS = {
  email: string;
};

//.. signup
export type LIVE_APPS_SIGNUP_DETAILS = {
  name: string;
  email: string;
};

//.. validate OTP details
export type LIVE_APPS_VALIDATE_OTP_DETAILS = {
  email: string;
  otp: string;
};

//.. validate OTP response
export type LIVE_APPS_VALIDATE_OTP_RESPONSE = {
  refreshToken: string;
  token: string;
};

// ---------------------------------------------------------------- //

// users
export type USER_DETAILS = {
  image?: any;
  name: AUTH_DATA["name"];
  user_name: AUTH_DATA["user_name"];
  user_tag: AUTH_DATA["user_tag"];
  email: AUTH_DATA["email"];
  _id: string;
};

export type USERS = USER_DETAILS[];

export interface USER_STATE {
  profile?: AUTH_DATA | null;
}

// ------------------------------------------------------------------ //

// guild
export type GUILD_DETAILS = {
  name: string;
  image: null;
  description: string;
  _id: string;
};

export type GUILDS = GUILD_DETAILS[];

export * from "./custom-models";
