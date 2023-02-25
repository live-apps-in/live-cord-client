import { styled } from "@mui/material";

const StyledGridBoxWrapper = styled("div")((props) => ({
  display: "grid",
  ...props.style,
}));

export const GridBox: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  return (
    <StyledGridBoxWrapper {...props}>{props.children}</StyledGridBoxWrapper>
  );
};
