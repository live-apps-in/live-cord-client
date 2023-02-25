import { navigationLinks } from "src/routes";
import { Header } from "./header";
import { styled } from "@mui/material";
import { CustomButton, CustomIconButton, MediaQueryBox } from "src/components";
import { layoutSettings } from "./layout-settings";
import { useSelector } from "src/redux";
import { useAuth } from "src/hooks";
import { useState } from "react";
import { authConfig } from "src/config";
import { isActiveRoute } from "src/utils";
import { useLocation } from "react-router-dom";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import LoginIcon from "@mui/icons-material/Login";

const MainContentWrapper = styled("div")`
  width: 100vw;
  max-width: 100vw;
  overflow: auto;
  height: calc(100vh - ${layoutSettings.header.height});
  max-height: 100vh;
`;

export const AuthLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
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

  const authenticationButtonProps = {
    loading,
    onClick: isAuthenticated && handleLogout,
    href: !isAuthenticated ? authConfig.signupPage : undefined,
  };

  const actions =
    // display only if its not the signup page
    !isActiveRoute({ path: pathname, route: authConfig.signupPage }) ? (
      <>
        <MediaQueryBox down={{ breakpoint: "md", style: { display: "none" } }}>
          <CustomButton {...authenticationButtonProps}>
            {isAuthenticated ? "Logout" : "Sign Up"}
          </CustomButton>
        </MediaQueryBox>
        <MediaQueryBox up={{ breakpoint: "md", style: { display: "none" } }}>
          <CustomIconButton
            {...authenticationButtonProps}
            style={{ padding: 0, margin: 0 }}
          >
            {isAuthenticated ? <PowerSettingsNewIcon /> : <LoginIcon />}
          </CustomIconButton>
        </MediaQueryBox>
      </>
    ) : (
      <div />
    );

  return (
    <>
      <Header navigationLinks={navigationLinks.authLayout} actions={actions} />
      <MainContentWrapper>{children}</MainContentWrapper>
    </>
  );
};
