import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { useTheme } from "@mui/material";
import {
  CustomButton,
  // CustomCard,
  CustomText,
  CUSTOM_MODAL_COMPONENT_PROPS,
  XYCenter,
} from "src/components";

export const WelcomeModal: React.FC<CUSTOM_MODAL_COMPONENT_PROPS> = ({
  onCancel,
  name,
}) => {
  const theme = useTheme();
  return (
    <XYCenter style={{ flexDirection: "column" }}>
      <SentimentSatisfiedAltIcon
        style={{
          fontSize: "20px",
          color: theme.colors.warning,
        }}
      />
      <CustomText
        variant="h3"
        style={{ textAlign: "center", padding: "10px", fontSize: "20px" }}
      >
        Welcome, {name}!
      </CustomText>
      <CustomButton onClick={onCancel as any}>Continue</CustomButton>
    </XYCenter>
  );
};
