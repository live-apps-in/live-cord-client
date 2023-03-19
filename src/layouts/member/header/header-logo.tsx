import { styled } from "@mui/material";
import { CustomText, FlexRow } from "src/components";
import { Logo } from "./logo";

const HeaderLogoWrapper = styled(FlexRow)`
  gap: 10px;
  align-items: center;
  margin: auto;
  width: fit-content;
`;

export const HeaderLogo: React.FC = () => {
  return (
    <HeaderLogoWrapper>
      <Logo />
      <CustomText variant="h3" style={{ fontWeight: "bold" }}>
        Live Cord
      </CustomText>
    </HeaderLogoWrapper>
  );
};
