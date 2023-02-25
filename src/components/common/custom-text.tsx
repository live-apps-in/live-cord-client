import {
  FormLabel,
  FormLabelProps,
  Typography,
  TypographyProps,
  styled,
} from "@mui/material";
import { Link, To, LinkProps } from "react-router-dom";

interface TYPOGRAPHY_PROPS {
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "success"
    | "info"
    | "black"
    | "default";
  style?: TypographyProps["style"];
  align?: "center" | "left" | "right";
  href?: To;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline";
  linkProps?: Omit<LinkProps, "to">;
}

export type CUSTOM_TEXT_PROPS<variant = TYPOGRAPHY_PROPS["variant"]> =
  TYPOGRAPHY_PROPS &
    (variant extends "label"
      ? FormLabelProps
      : Omit<TypographyProps, "align" | "variant">);

const styleFunction = ({ theme, ...props }) => ({
  ...theme.componentCustomStyles[props.variant],
  color: theme.colors[props.color],
  textAlign: props.align,
  ...props.style,
});

const StyledText = styled(Typography)(styleFunction);

const StyledLabel = styled((props) => <FormLabel {...props} />)(styleFunction);

const StyledLink = styled(Link)(
  ({ theme }) => theme.componentCustomStyles.link
);

export const CustomText: React.FC<CUSTOM_TEXT_PROPS> = ({
  color = "default",
  variant = "p",
  children,
  href,
  linkProps,
  ...rest
}) => {
  const Wrapper = href ? StyledLink : (props: any) => <>{props.children}</>;

  let Component = StyledText;

  if (variant === "label") Component = StyledLabel;

  return (
    <Wrapper {...linkProps} to={href}>
      <Component {...(rest as any)} variant={variant} color={color}>
        {children}
      </Component>
    </Wrapper>
  );
};
