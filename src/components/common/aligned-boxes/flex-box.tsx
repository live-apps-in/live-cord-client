import { styled } from "@mui/material";

const StyledFlexBoxWrapper = styled("div")((props) => ({
  display: "flex",
  ...props.style,
}));

export const FlexBox: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  return (
    <StyledFlexBoxWrapper {...props}>{props.children}</StyledFlexBoxWrapper>
  );
};
