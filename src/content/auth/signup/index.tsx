import { SignupForm } from "./signup-form";
import { styled } from "@mui/material";
import { mediaQuery } from "src/theme";
import { XYCenter } from "src/components";
// import { AuthPageBG } from "src/assets";

const StyledSignupPageWrapper = styled("div")`
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  ${mediaQuery.up("md")} {
    display: grid;
    grid-template-columns: 60% 40%;
  }
`;

// const StyledImageContainer = styled("div")`
//   background-image: url("${AuthPageBG}");
//   background-size: contain;
//   background-position: center;
//   background-repeat: no-repeat;
//   height: 50%;
//   ${mediaQuery.up("md")} {
//     background-size: auto calc(100% - 100px);
//     background-position: right top;
//     display: grid;
//     grid-template-rows: 1fr auto;
//     height: 100%;
//   }
// `;

// const StyledImageContentWrapper = styled("div")`
//   padding: 20px;
//   ${mediaQuery.up("sm")} {
//     padding: 30px;
//   }
// `;

// const FooterWrapper = styled("div")`
//   padding: 30px;
//   display: none;
//   ${mediaQuery.up("md")} {
//     display: block;
//   }
// `;

const SignupFormContainerWrapper = styled(XYCenter)`
  height: 50%;
  ${mediaQuery.up("md")} {
    height: 100%;
  }
`;

export const SignupPageContent = () => {
  return (
    <StyledSignupPageWrapper>
      {/* <StyledImageContainer>
        <StyledImageContentWrapper>{IntroWords}</StyledImageContentWrapper>
        <FooterWrapper>
          <SocialLinksFooter />
        </FooterWrapper>
      </StyledImageContainer> */}
      <div />
      <SignupFormContainerWrapper>
        <SignupForm />
      </SignupFormContainerWrapper>
    </StyledSignupPageWrapper>
  );
};
