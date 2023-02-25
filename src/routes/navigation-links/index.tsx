import { adminLayoutNavigationLinks } from "./admin";
import { authLayoutNavigationLinks } from "./auth";
import { memberLayoutNavigationLinks } from "./member";

export const navigationLinks = {
  adminLayout: adminLayoutNavigationLinks,
  memberLayout: memberLayoutNavigationLinks,
  authLayout: authLayoutNavigationLinks,
};

// all the navigation links exported here are layout-specific
