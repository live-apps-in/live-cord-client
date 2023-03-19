import { Actions } from "./actions";
import { Logo } from "./logo";
import { NAVIGATION_LINKS } from "src/routes";
import { CustomText, FlexRow, JustifyBetween } from "src/components";
import { mediaQuery } from "src/theme";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTheme, styled } from "@mui/material";
import { MobileSidebar } from "../sidebar/mobile-sidebar";

const StyledDesktopHeaderWrapper = styled(JustifyBetween)`
  padding: 20px;
  align-items: center;
  ${mediaQuery.down(1200)} {
    display: none;
  }
`;

const StyledTabletHeaderWrapper = styled(JustifyBetween)`
  padding: 20px;
  align-items: center;
  ${mediaQuery.down("md")} {
    display: none;
  }
  ${mediaQuery.up(1200)} {
    display: none;
  }
`;

const StyledMobileHeaderWrapper = styled(JustifyBetween)(`
  width: 100%;
  padding: 19px;
  align-items: center;
  ${mediaQuery.up("md")} {
    display: none;
  }
`);

export interface HEADER_PROPS {
  navigationLinks?: NAVIGATION_LINKS;
  actions?: React.ReactNode;
}

export const Header = ({ navigationLinks = [], actions = null }) => {
  const theme = useTheme();
  const [title, setTitle] = useState(document.title);

  useEffect(() => {
    setTitle(document.title);
  }, [document.title]);

  return (
    <>
      <Helmet onChangeClientState={(newState) => setTitle(newState.title)} />
      <StyledMobileHeaderWrapper>
        {navigationLinks && navigationLinks.length > 0 && (
          <MobileSidebar navigationLinks={navigationLinks} />
        )}
        <CustomText variant="h4" style={{ fontWeight: "bold" }}>
          {title}
        </CustomText>
        {actions}
      </StyledMobileHeaderWrapper>
      <StyledTabletHeaderWrapper>
        <CustomText variant="h2">{title}</CustomText>
        <FlexRow style={{ alignItems: "center", gap: 10 }}>{actions}</FlexRow>
      </StyledTabletHeaderWrapper>
      <StyledDesktopHeaderWrapper>
        <CustomText variant="h2">{title}</CustomText>
        {actions && <Actions>{actions}</Actions>}
      </StyledDesktopHeaderWrapper>
    </>
  );
};

export * from "./header-logo";
