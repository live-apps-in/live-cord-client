import { adminRoutes } from "./admin";
import { pingUserRoutes } from "./ping_user";
import { authRoutes } from "./auth";
import { publicRoutes } from "./public";

export const routeDefinition = {
  auth: authRoutes,
  admin: adminRoutes,
  ping_user: pingUserRoutes,
  public: publicRoutes,
};
