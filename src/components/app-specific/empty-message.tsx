import { styled } from "@mui/material";
import { CustomText, FlexRow, XYCenter } from "../common";
import { mediaQuery } from "src/theme";

export interface EMPTY_MESSAGE_PROPS {
  message?: string;
  actions?: React.ReactNode;
}

const EmptyMessageContainer = styled(XYCenter)`
  width: 100%;
  min-height: 100%;
  max-height: 100%;
  flex-direction: column;
  gap: 20px;
`;

const EmptyMessageTextContainer = styled("div")`
  width: 90%;
  ${mediaQuery.up("md")} {
    width: 50%;
  }
`;

const ActionsContainer = styled(FlexRow)`
  gap: 10px;
`;

export const EmptyMessage: React.FC<EMPTY_MESSAGE_PROPS> = (props) => {
  const { message, actions } = props;

  return (
    <EmptyMessageContainer>
      <EmptyMessageTextContainer>
        <CustomText variant="h2" align="center">
          {message}
        </CustomText>
      </EmptyMessageTextContainer>
      <ActionsContainer>{actions}</ActionsContainer>
    </EmptyMessageContainer>
  );
};
