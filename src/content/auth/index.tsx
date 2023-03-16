import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authConfig } from "src/config";
import { useAuth } from "src/hooks";
import { LIVE_APPS_AUTH_RETURN_URL_PARAMS } from "src/model";
import { getSearchQuery, handleError } from "src/utils";

export const AuthPageContent = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchQuery = getSearchQuery(
    search
  ) as unknown as LIVE_APPS_AUTH_RETURN_URL_PARAMS;
  console.log(searchQuery);
  useEffect(() => {
    handlePrimaryActions();
  }, [searchQuery]);

  const handlePrimaryActions = () => {
    if (searchQuery?.token && searchQuery?.refreshToken) {
      handleLogin();
    } else {
      navigate(`${searchQuery.backtoURL || authConfig.signupPage}`);
    }
  };

  const handleLogin = async () => {
    const { token, refreshToken } = searchQuery;
    try {
      const data = await login({ token, refreshToken });
      // TODO: make use of backtoURL here
      navigate(`${searchQuery.backtoURL || data.role}`);
    } catch (err) {
      window.alert(authConfig.signupPage);
      navigate(`${searchQuery.backtoURL || authConfig.signupPage}`);
      handleError(err);
    }
  };

  return null;
};

export * from "./signup";
export * from "./social";
