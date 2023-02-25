import { styled } from "@mui/material";

const StyledFlexRowWrapper = styled("div")((props) => ({
  display: "flex",
  flexDirection: "row",
  ...props.style,
}));

export const FlexRow: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  return (
    <StyledFlexRowWrapper {...props}>{props.children}</StyledFlexRowWrapper>
  );
};
