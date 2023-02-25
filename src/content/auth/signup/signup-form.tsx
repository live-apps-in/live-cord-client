import { useLocation } from "react-router-dom";
import { CustomButton, CustomCard, CustomText } from "src/components";
import { authConfig, projectConfig } from "src/config";
import { useAuth, useUniqueKey } from "src/hooks";
import {
  getSearchQuery,
  getSearchString,
  getSearchStringWithUrl,
} from "src/utils";
import { styled } from "@mui/material";
import { layoutSettings } from "src/layouts/auth/layout-settings";
import { LiveApps } from "src/theme";

const StyledCustomCardWrapper = styled(CustomCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 40px;
  margin-top: -${layoutSettings.header.height};
`;

export const SignupForm = () => {
  const { search } = useLocation();
  const searchQuery = getSearchQuery(search);

  const loginUrl = `${authConfig.liveAppsPortal}?${getSearchString({
    redirectUrl: `${projectConfig.appBaseurl}${
      authConfig.authPage
    }?${getSearchString(searchQuery)}`,
  })}`;

  return (
    <StyledCustomCardWrapper
      customHeader={
        <CustomText align="center" variant="h2">
          Live
          <CustomText
            style={{ display: "inline-block" }}
            variant="h2"
            color="primary"
          >
            Cord
          </CustomText>
        </CustomText>
      }
    >
      <CustomButton startIcon={<LiveApps />} href={loginUrl} variant="outlined">
        Continue with Live Apps
      </CustomButton>
    </StyledCustomCardWrapper>
  );
};
