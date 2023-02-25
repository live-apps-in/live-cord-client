import { authActions, themeActions } from "./slices";
import { userActions } from "./slices";

export const actions = {
  authActions: { ...authActions },
  userActions: { ...userActions },
  theme: { ...themeActions },
};
