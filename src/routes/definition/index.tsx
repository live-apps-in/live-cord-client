import { adminRoutes } from "./admin";
import { memberRoutes } from "./member";
import { authRoutes } from "./auth";
import { publicRoutes } from "./public";

export const routeDefinition = {
  auth: authRoutes,
  admin: adminRoutes,
  member: memberRoutes,
  public: publicRoutes,
};
