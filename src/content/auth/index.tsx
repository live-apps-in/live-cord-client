import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
      // if you have the signup flag, redirect to signup page
      // if (searchQuery?.signup) {
      //   // include the current search string to the url, to reuse it every where
      //   navigate(`${authConfig.signupPage}${search}`);
      //   return;
      // }
      handleLogin();
    }
  };

  const handleLogin = async () => {
    const { token, refreshToken } = searchQuery;
    try {
      const data = await login({ token, refreshToken });
      // TODO: make use of backtoURL here
      navigate(`/${searchQuery.backtoURL || data.role}`);
    } catch (err) {
      handleError(err);
    }
  };

  return null;
};

export * from "./signup";
