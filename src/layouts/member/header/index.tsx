import { Actions } from "./actions";
import { NAVIGATION_PROPS } from "src/routes";
import { CustomText, FlexRow, JustifyBetween } from "src/components";
import { mediaQuery } from "src/theme";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { styled } from "@mui/material";
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
  navigationProps?: NAVIGATION_PROPS;
  actions?: React.ReactNode;
}

export const Header = ({ navigationProps = [], actions = null }) => {
  const [title, setTitle] = useState(document.title);

  useEffect(() => {
    setTitle(document.title);
  }, [document.title]);

  return (
    <>
      <Helmet onChangeClientState={(newState) => setTitle(newState.title)} />
      <StyledMobileHeaderWrapper>
        {navigationProps && navigationProps.length > 0 && (
          <MobileSidebar navigationProps={navigationProps} />
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
