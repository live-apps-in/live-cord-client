import { styled, useTheme } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, To } from "react-router-dom";
import { navigateToUrl } from "src/utils";

// custom-button props
export interface NavigateOptions {
  replace?: boolean;
  state?: any;
}

export interface CUSTOM_BUTTON_PROPS extends Omit<ButtonProps, "href"> {
  loading?: boolean | null;
  href?:
    | string
    | {
        to: To;
        options?: NavigateOptions;
      };
  linkStyle?: boolean;
}

const LinkStyledButton = styled(Button)(
  ({ theme }) => `
  padding: 0;
  color: ${theme.colors.black};
  text-align: left;
  font-weight: normal;
  :hover {
    text-decoration: underline;
    background: none;
  }
`
);

const StyledButton = styled(Button)(`
    border-radius: 10px;
`);

export const CustomButton: React.FC<CUSTOM_BUTTON_PROPS> = (props) => {
  const theme = useTheme();
  // // create custom theme for button
  // const buttonTheme = createTheme(theme.componentCustomStyles.ButtonTheme);

  const navigate = useNavigate();
  const { loading, href, linkStyle, ...rest } = props;

  const goto = (route: CUSTOM_BUTTON_PROPS["href"]) => {
    if (route) {
      let redirectRoute;
      let redirectRouteOptions = {};

      // extract navigation options
      if (typeof route === "string") redirectRoute = route;
      else if ("to" in route) {
        redirectRoute = route.to;
        redirectRouteOptions = route.options;
      } else redirectRoute = route;

      // navigate based on the route type (either an extire url / just pathname)
      if (
        redirectRoute.startsWith("http://") ||
        redirectRoute.startsWith("https://")
      ) {
        navigateToUrl(redirectRoute);
      } else navigate(redirectRoute);
    }
  };

  const ButtonComponent = linkStyle ? LinkStyledButton : StyledButton;

  return (
    <ButtonComponent
      // theme={buttonTheme}
      variant={linkStyle ? undefined : "contained"}
      color={linkStyle ? undefined : "primary"}
      startIcon={loading ? <CircularProgress size="1rem" /> : null}
      {...rest}
      disabled={loading || props.disabled}
      onClick={
        href || rest.onClick
          ? (e) => {
              if (href) goto(href);
              if (rest.onClick) rest.onClick(e);
            }
          : undefined
      }
    >
      {rest.children}
    </ButtonComponent>
  );
};
