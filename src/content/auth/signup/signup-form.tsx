import { useLocation } from "react-router-dom";
import {
  CustomButton,
  CustomCard,
  CustomText,
  MediaQueryBox,
} from "src/components";
import { authConfig } from "src/config";
import { useAuth, useUniqueKey } from "src/hooks";
import { Logo } from "src/layouts/auth/header/logo";
import { GoogleIcon, MicrosoftIcon } from "src/theme";
import { capitalize, getSearchQuery, getSearchStringWithUrl } from "src/utils";
import { styled } from "@mui/material";

const StyledCustomCardWrapper = styled(CustomCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 40px;
`;

// wrapper for mobile screen
const SignupFormWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SignupForm = () => {
  const { getOAuthUrl } = useAuth<true>({ isOAuth: true });
  const keys = useUniqueKey(3);
  const { search } = useLocation();
  const searchQuery = getSearchQuery(search);

  const getRedirectUrl = (provider) => {
    return getSearchStringWithUrl({
      url: getOAuthUrl(provider),
      query: {
        authURL: authConfig.signupPage,
        backToURL: searchQuery?.backToURL,
      },
    });
  };

  const commonButtonProps = {
    shape: "circular",
    fullWidth: true,
    appearance: "outline",
  };

  const socialButtons: any[] = [
    {
      ...commonButtonProps,
      icon: <GoogleIcon />,
      socialName: "google",
    },
    {
      ...commonButtonProps,
      icon: <MicrosoftIcon />,
      socialName: "microsoft",
    },
  ];

  const content = socialButtons.map((el, index) => (
    <CustomButton
      key={keys[index]}
      {...el}
      href={getRedirectUrl(el.socialName)}
    >
      Continue with {capitalize(el.socialName)}
    </CustomButton>
  ));

  return (
    <>
      <MediaQueryBox down={{ breakpoint: "md", style: { display: "none" } }}>
        <StyledCustomCardWrapper
          customHeader={
            <CustomText align="center" variant="h2">
              Sign Up to{" "}
              <CustomText
                style={{ display: "inline-block" }}
                variant="h2"
                color="primary"
              >
                Application
              </CustomText>
            </CustomText>
          }
        >
          {content}
        </StyledCustomCardWrapper>
      </MediaQueryBox>
      <MediaQueryBox up={{ breakpoint: "md", style: { display: "none" } }}>
        <SignupFormWrapper style={{ flexDirection: "column" }}>
          <Logo />
          {content}
        </SignupFormWrapper>
      </MediaQueryBox>
    </>
  );
};
