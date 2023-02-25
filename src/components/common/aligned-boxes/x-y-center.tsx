import { styled } from "@mui/material";

const StyledXYCenterWrapper = styled("div")((props) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ...props.style,
}));

export const XYCenter: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  return (
    <StyledXYCenterWrapper {...props}>{props.children}</StyledXYCenterWrapper>
  );
};
