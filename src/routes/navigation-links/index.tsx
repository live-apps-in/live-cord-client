import { adminLayoutNavigationProps } from "./admin";
import { authLayoutNavigationProps } from "./auth";
import { memberLayoutNavigationProps } from "./member";

export const navigationProps = {
  adminLayout: adminLayoutNavigationProps,
  memberLayout: memberLayoutNavigationProps,
  authLayout: authLayoutNavigationProps,
};

// all the navigation links exported here are layout-specific
