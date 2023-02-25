import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardHeaderProps,
  CardProps,
  styled,
} from "@mui/material";
import { CardSpinner } from "../app-specific";

export interface CUSTOM_CARD_PROPS extends CardProps {
  fullWidth?: boolean;
  customHeader?: React.ReactNode;
  cardActions?: React.ReactNode;
  headerProps?: CardHeaderProps;
  loading?: boolean;
}

const StyledCardWrapper = styled(Card)(({ theme, ...rest }: any) => ({
  ...theme.componentCustomStyles.Card,
  width: rest.fullWidth ? "100%" : rest.width,
}));

const StyledCardContent = styled(CardContent)`
  padding: 16px !important;
`;

// more customizations will be done in future
export const CustomCard: React.FC<CUSTOM_CARD_PROPS> = ({
  cardActions,
  customHeader,
  headerProps,
  children,
  loading,
  ...rest
}) => {
  return (
    <StyledCardWrapper {...rest}>
      {customHeader
        ? customHeader
        : headerProps && <CardHeader {...headerProps} />}
      <StyledCardContent>
        {loading ? <CardSpinner withContainer={false} /> : children}
      </StyledCardContent>
      {cardActions && <CardActions>{cardActions}</CardActions>}
    </StyledCardWrapper>
  );
};
