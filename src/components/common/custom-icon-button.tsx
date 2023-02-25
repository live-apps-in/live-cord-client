import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { useNavigate, To } from "react-router-dom";

// custom-button props
interface NavigateOptions {
  replace?: boolean;
  state?: any;
}

export interface CUSTOM_ICON_BUTTON_PROPS extends Omit<IconButtonProps, "href"> {
  loading?: boolean | null;
  href?:
    | string
    | {
        to: To;
        options?: NavigateOptions;
      };
}

export const CustomIconButton: React.FC<CUSTOM_ICON_BUTTON_PROPS> = (props) => {
  const navigate = useNavigate();
  const { loading, href, ...rest } = props;

  const goto = (route: CUSTOM_ICON_BUTTON_PROPS["href"]) => {
    if (route) {
      if (typeof route === "string") navigate(route);
      else if ("to" in route) navigate(route.to, route.options);
      else navigate(route);
    }
  };

  return (
    <IconButton
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
    </IconButton>
  );
};
