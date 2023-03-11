import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomButton } from "src/components";
import { useAuth } from "src/hooks";
import {
  DISCORD_LOGIN_RETURN_URL_PARAMS,
  LIVE_APPS_AUTH_RETURN_URL_PARAMS,
} from "src/model";
import { getSearchQuery, handleError } from "src/utils";

export const AuthPageContent = () => {
  const { data, login, discordLogin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchQuery = getSearchQuery(
    search
  ) as unknown as LIVE_APPS_AUTH_RETURN_URL_PARAMS &
    DISCORD_LOGIN_RETURN_URL_PARAMS;

  useEffect(() => {
    handlePrimaryActions();
  }, [searchQuery]);

  const handlePrimaryActions = async () => {
    if (isAuthenticated && data) {
      // if its connect to discord request
      if (searchQuery?.code) {
        try {
          await discordLogin({ code: searchQuery.code });
          navigate(`/${searchQuery.backtoURL || data.role}`);
          window.flash({ message: "Successfully connected to Discord" });
        } catch (err) {
          handleError(err);
        }
      } else navigate(`/${searchQuery.backtoURL || data.role}`);
    } else if (searchQuery?.token && searchQuery?.refreshToken) {
      // if its a normal authentication
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

  return (
    searchQuery.code && (
      <div>
        <CustomButton onClick={handlePrimaryActions}>Retry</CustomButton>
        <CustomButton href={"/member"}>Go Home</CustomButton>
      </div>
    )
  );
};

export * from "./signup";
