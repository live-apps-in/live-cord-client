import { styled } from "@mui/material";

const StyledFlexColumnWrapper = styled("div")((props) => ({
  display: "flex",
  flexDirection: "column",
  ...props.style,
}));

export const FlexColumn: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  return (
    <StyledFlexColumnWrapper {...props}>
      {props.children}
    </StyledFlexColumnWrapper>
  );
};
