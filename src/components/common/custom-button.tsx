import { styled } from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, To } from "react-router-dom";

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
  color: ${theme.colors.primary};
  text-align: left;
  font-weight: normal;
  :hover {
    text-decoration: underline;
    background: none;
  }
`
);

export const CustomButton: React.FC<CUSTOM_BUTTON_PROPS> = (props) => {
  const navigate = useNavigate();
  const { loading, href, linkStyle, ...rest } = props;

  const goto = (route: CUSTOM_BUTTON_PROPS["href"]) => {
    if (route) {
      if (typeof route === "string") navigate(route);
      else if ("to" in route) navigate(route.to, route.options);
      else navigate(route);
    }
  };

  const ButtonComponent = linkStyle ? LinkStyledButton : Button;

  return (
    <ButtonComponent
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
