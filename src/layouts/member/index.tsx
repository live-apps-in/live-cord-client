import { navigationLinks } from "src/routes";
import { Header } from "./header";
import { styled } from "@mui/material";
import { CustomButton, FlexRow } from "src/components";
import { layoutSettings } from "./layout-settings";
import { useAuth } from "src/hooks";
import { useState } from "react";
import { authConfig, discordConfig } from "src/config";
import { isActiveRoute } from "src/utils";
import { useLocation } from "react-router-dom";
import { DesktopSidebar } from "./sidebar/desktop-sidebar";

const MainContentWrapper = styled("div")`
  width: 100%;
  overflow: auto;
  height: calc(100vh - ${layoutSettings.header.height});
  max-height: 100vh;
`;

const AppContainer = styled(FlexRow)`
  width: 100vw;
  height: 100vh;
`;

const ContentContainer = styled("div")`
  height: 100%;
  width: 100%;
  background-color: #f5f4f6;
`;

// const DesktopSidebar = styled(Sidebar)`
//   display: none;
//   ${mediaQuery.up("md")} {
//     display: block;
//   }
// `;

export const MemberLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { pathname } = useLocation();
  const { logout, data } = useAuth();
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

  const actions = (
    <FlexRow style={{ gap: 10 }}>
      {/* display only if its not the signup page */}
      {!isActiveRoute({ path: pathname, route: authConfig.signupPage }) && (
        <CustomButton loading={loading} onClick={handleLogout}>
          Logout
        </CustomButton>
      )}
      {!data?.discord && (
        <a href={discordConfig.url} rel="noreferrer">
          <CustomButton>Connect to discord</CustomButton>
        </a>
      )}
    </FlexRow>
  );

  return (
    <AppContainer>
      <DesktopSidebar navigationLinks={navigationLinks.memberLayout} />
      <ContentContainer>
        <Header
          navigationLinks={navigationLinks.memberLayout}
          actions={actions}
        />
        <MainContentWrapper>{children}</MainContentWrapper>
      </ContentContainer>
    </AppContainer>
  );
};
