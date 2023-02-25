import { styled } from "@mui/material";

const StyledJustifyBetweenWrapper = styled("div")((props) => ({
  display: "flex",
  justifyContent: "space-between",
  ...props.style,
}));

export const JustifyBetween: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  return (
    <StyledJustifyBetweenWrapper {...props}>
      {props.children}
    </StyledJustifyBetweenWrapper>
  );
};
