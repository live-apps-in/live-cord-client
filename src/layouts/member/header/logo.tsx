import { styled } from "@mui/material";
// import { AppLogoFullImage } from "src/assets";
import { mediaQuery } from "src/theme";
import { Link } from "react-router-dom";

const StyledLogoWrapper = styled(Link)`
  img {
    width: 120px;
    height: 30px;
  }
  ${mediaQuery.up("sm")} {
    img {
      width: 120px;
      height: 30px;
    }
  }
`;

export const Logo = () => {
  return (
    <StyledLogoWrapper to="/">
      {/* <img src={AppLogoFullImage} alt={projectConfig.title} /> */}
    </StyledLogoWrapper>
  );
};
