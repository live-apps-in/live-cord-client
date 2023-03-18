import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "src/hooks";
import {
  DISCORD_AUTH_PARAMS,
  LIVE_APPS_AUTH_RETURN_URL_PARAMS,
} from "src/model";
import { getSearchQuery, handleError } from "src/utils";

export const SocialAuthContent: React.FC = () => {
  const { provider } = useParams() as any;
  const { socialAuth, data: authData } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchQuery = getSearchQuery(
    search
  ) as unknown as LIVE_APPS_AUTH_RETURN_URL_PARAMS & DISCORD_AUTH_PARAMS;

  // on mount
  useEffect(() => {
    if (provider) handlePrimaryActions();
  }, [provider]);

  const handlePrimaryActions = async () => {
    try {
      const data = await socialAuth({
        code: searchQuery.code,
        provider,
      });
      navigate(`${searchQuery.backtoURL || `/${data.role}`}`);
      window.flash({ message: "Successfully connected to Discord" });
    } catch (err) {
      handleError(err);
      navigate(`${searchQuery.backtoURL || `/${authData?.role}` || "/"}`);
    }
  };

  return <div>loading...</div>;
};
