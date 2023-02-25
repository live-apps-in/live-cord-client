import { styled } from "@mui/material";

const StyledYCenterWrapper = styled("div")((props) => ({
  display: "flex",
  alignItems: "center",
  ...props.style,
}));

export const YCenter: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  return (
    <StyledYCenterWrapper {...props}>{props.children}</StyledYCenterWrapper>
  );
};
