// redux
// #rbac-setup
export type ROLE = "admin" | "member";

export interface AUTH_DATA {
  role: ROLE;
  name: string;
  discord?: null | {
    user_name: string;
    discriminator: string;
    id: string;
    avatar?: string;
    display_name?: string;
  };
  guilds?: string[];
  guild?: string | null;
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

export type DISCORD_AUTH_PARAMS = {
  code?: SOCIAL_AUTH_PROVIDER;
  provider?: "discord";
};

export type REGISTER_PARAMS = {
  name: string;
  email: string;
};

export type ACCOUNTS_PROFILE_DETAILS = {
  apps: {
    [key: string]: { isActive: boolean; userId: string };
  };
  email: string;
  id: string;
  name: string;
  platform: string;
};

export type REGISTER_WITH_LIVE_APPS_ACCOUNT_RESPONSE = {
  discord: null | Object;
  email: string;
  guilds: GUILDS;
  name: string;
  _id: string;
};

export type SOCIAL_AUTH_PARAMS = DISCORD_AUTH_PARAMS;

export enum SOCIAL_AUTH_PROVIDER {
  DISCORD = "discord",
}

export type LOGIN_AUTH_PROPS = {
  token: string;
  refreshToken: string;
};

export interface LIVE_APPS_AUTH_RETURN_URL_PARAMS extends LOGIN_AUTH_PROPS {
  backtoURL?: string;
  signup?: boolean;
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

// reaction roles rebuild
export type REACTION_ROLE_MAPPING_EMOJI = {
  type: "guild" | "standard";
  id?: string;
  name: string;
  standardEmoji: string | null; // TODO: emoji
};

export type REACTION_ROLES_MAPPING_DETAIL = {
  name: string;
  roleId?: string;
  emoji: REACTION_ROLE_MAPPING_EMOJI;
};

export type REACTION_ROLES_MAPPING_ADD = {
  name: string;
  roleId?: string;
  emoji: string;
};

export type ADD_REACTION_ROLE = {
  name: string;
};

export type REACTION_ROLE_DETAILS = {
  _id?: string;
  name: string;
  guildId: string;
  rolesMapping: REACTION_ROLES_MAPPING_DETAIL[];
  discordEmbedConfig: EMBED_BUILDER_PROPS;
};

export type REACTION_ROLES = REACTION_ROLE_DETAILS[];

// embed builder
export type EMBED_BUILDER_PROPS = {
  title?: string;
  description?: string;
  color?: string;
  fields?: ROLE_FIELD_DETAILS[];
  timestamp?: string;
  author?: string;
  footer?: ROLE_FIELD_FOOTER;
  isActive?: boolean;
};

export type ROLE_FIELD_DETAILS = {
  name: string;
  value: string;
  inline: boolean;
};

export type ROLE_FIELD_FOOTER = {
  text: string;
};
// ---------------------------------- //
export * from "./custom-models";
