import { navigationLinks } from "src/routes";
import { Header } from "./header";
import { styled } from "@mui/material";
import { CustomButton, FlexRow } from "src/components";
import { layoutSettings } from "./layout-settings";
import { useAuth } from "src/hooks";
import { useState } from "react";
import { authConfig, discordConfig } from "src/config";
import { getSearchString, isActiveRoute } from "src/utils";
import { useLocation } from "react-router-dom";

const MainContentWrapper = styled("div")`
  width: 100vw;
  max-width: 100vw;
  overflow: auto;
  height: calc(100vh - ${layoutSettings.header.height});
  max-height: 100vh;
`;

export const MemberLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } catch (err) {
      /* ignore error */
    }
    setLoading(false);
  };
  const discordAuthUrl = `${process.env.REACT_APP_DISCORD_BASE_URL}${
    authConfig.discordOAuthPage
  }?${getSearchString({
    client_id: discordConfig.clientId,
    redirect_uri: discordConfig.redirectUri,
    scope: discordConfig.scope,
    response_type: discordConfig.responseType,
  })}`;
  console.log(discordAuthUrl);

  const actions = (
    <FlexRow style={{ gap: 10 }}>
      {/* display only if its not the signup page */}
      {!isActiveRoute({ path: pathname, route: authConfig.signupPage }) && (
        <CustomButton loading={loading} onClick={handleLogout}>
          Logout
        </CustomButton>
      )}
      <a href={discordAuthUrl} rel="noreferrer">
        <CustomButton>Connect to discord</CustomButton>
      </a>
    </FlexRow>
  );

  return (
    <>
      <Header
        navigationLinks={navigationLinks.memberLayout}
        actions={actions}
      />
      <MainContentWrapper>{children}</MainContentWrapper>
    </>
  );
};
