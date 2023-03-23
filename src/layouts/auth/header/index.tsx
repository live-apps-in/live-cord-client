import { Actions } from "./actions";
import { Logo } from "./logo";
import { NAVIGATION_PROPS } from "src/routes";
import { CustomText, FlexRow, JustifyBetween, YCenter } from "src/components";
import { mediaQuery } from "src/theme";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTheme, styled } from "@mui/material";

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

const StyledMobileHeaderWrapper = styled(JustifyBetween)(
  ({ theme }) => `
  width: 100%;
  background-color: ${theme.colors.primary};
  padding: 19px;
  align-items: center;
  ${mediaQuery.up("md")} {
    display: none;
  }
`
);

const StyledNavigationWrapper = styled(YCenter)``;

export interface HEADER_PROPS {
  navigationProps?: NAVIGATION_PROPS;
  actions?: React.ReactNode;
}

export const Header = ({ navigationProps = [], actions = null }) => {
  const theme = useTheme();
  const [title, setTitle] = useState(document.title);

  useEffect(() => {
    setTitle(document.title);
  }, [document.title]);

  return (
    <>
      <Helmet onChangeClientState={(newState) => setTitle(newState.title)} />
      <StyledMobileHeaderWrapper>
        <CustomText
          variant="h4"
          style={{ fontWeight: "bold", color: theme.colors.white }}
        >
          {title}
        </CustomText>
        {actions}
      </StyledMobileHeaderWrapper>
      <StyledTabletHeaderWrapper>
        <Logo />
        <FlexRow style={{ alignItems: "center", gap: 10 }}>{actions}</FlexRow>
      </StyledTabletHeaderWrapper>
      <StyledDesktopHeaderWrapper>
        <Logo />
        <StyledNavigationWrapper>
          {actions && <Actions>{actions}</Actions>}
        </StyledNavigationWrapper>
      </StyledDesktopHeaderWrapper>
    </>
  );
};
