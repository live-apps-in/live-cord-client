import { Actions } from "./actions";
import { Logo } from "./logo";
import { styled } from "@mui/material";
import { NAVIGATION_PROPS } from "src/routes";
import { YCenter, JustifyBetween } from "src/components";

const StyledHeader = styled(JustifyBetween)`
  padding: 20px;
  align-items: center;
`;

export interface HEADER_PROPS {
  navigationProps?: NAVIGATION_PROPS;
  actions?: React.ReactNode;
}

export const Header: React.FC<
  HEADER_PROPS & { children?: React.ReactNode }
> = ({
  // navigationProps = [],
  actions = null,
}) => {
  return (
    <StyledHeader>
      <Logo />
      <YCenter>{actions && <Actions>{actions}</Actions>}</YCenter>
    </StyledHeader>
  );
};
