import { SignupForm } from "./signup-form";
import { styled } from "@mui/material";
import { XYCenter } from "src/components";

const StyledSignupPageWrapper = styled("div")`
  width: 100%;
  height: 100%;
`;
const StyledSignupFormContainer = styled(XYCenter)`
  width: 100%;
  height: 100%;
`;

export const SignupPageContent = () => {
  return (
    <StyledSignupPageWrapper>
      <StyledSignupFormContainer>
        <SignupForm />
      </StyledSignupFormContainer>
    </StyledSignupPageWrapper>
  );
};
