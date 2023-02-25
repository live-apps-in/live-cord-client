import { useState } from "react";
import { Box, Avatar, Typography } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import { CustomButton } from "src/components";
import { styled } from "@mui/material/styles";
import { CUSTOM_BUTTON_PROPS } from "src/components";

export interface CONFIRMATION_MODAL_PROPS {
  onConfirm?: Function;
  onCancel?: Function;
  title?: JSX.Element | string | null;
  description?: JSX.Element | string | null;
  confirmButton?:
    | JSX.Element
    | { label: any; props?: CUSTOM_BUTTON_PROPS }
    | null;
  cancelButton?:
    | JSX.Element
    | { label: any; props?: CUSTOM_BUTTON_PROPS }
    | null;
}

const AvatarWarning = styled(Avatar)(
  ({ theme }) => `
        color: ${theme.colors.warning};
        width: ${theme.spacing(12)};
        height: ${theme.spacing(12)};
  
        .MuiSvgIcon-root {
          font-size: ${theme.typography.pxToRem(45)};
        }
  `
);
const ButtonError = styled((props: CUSTOM_BUTTON_PROPS) => (
  <CustomButton {...props} />
))(
  ({ theme }) => `
       background: ${theme.colors.error};
       color: ${theme.palette.error.contrastText};
  
       &:hover {
          background: ${theme.colors.error};
       }
      `
);

export const ConfirmationModal: React.FC<CONFIRMATION_MODAL_PROPS> = (
  props
) => {
  const {
    onConfirm,
    onCancel,
    title,
    description,
    confirmButton = { label: "Yes" },
    cancelButton = { label: "No" },
  } = props;

  const [confirmButtonLoading, setConfirmButtonLoading] = useState(false);
  const [cancelButtonLoading, setCancelButtonLoading] = useState(false);

  const getConfirmButton = (
    confirmButton: CONFIRMATION_MODAL_PROPS["confirmButton"]
  ) => {
    if (typeof confirmButton === "object" && "label" in confirmButton)
      return (
        <CustomButton
          variant="outlined"
          size="large"
          loading={confirmButtonLoading}
          sx={{ mx: 1, ...confirmButton.props?.sx }}
          {...confirmButton.props}
          onClick={async (event) => {
            setConfirmButtonLoading(true);
            if (onConfirm) await onConfirm(event);
            if (confirmButton.props?.onClick)
              await confirmButton.props?.onClick(event);
            setConfirmButtonLoading(false);
          }}
        >
          {confirmButton.label || "Yes"}
        </CustomButton>
      );
    else if (confirmButton) return confirmButton;
    else return null;
  };
  const getCancelButton = (
    cancelButton: CONFIRMATION_MODAL_PROPS["cancelButton"]
  ) => {
    if (typeof cancelButton === "object" && "label" in cancelButton)
      return (
        <ButtonError
          variant="contained"
          size="large"
          sx={{ mx: 1, px: 3, ...cancelButton.props?.sx }}
          loading={cancelButtonLoading}
          {...cancelButton.props}
          onClick={async (event) => {
            setCancelButtonLoading(true);
            if (onCancel) await onCancel(event);
            if (cancelButton.props?.onClick)
              await cancelButton.props?.onClick(event);
            setCancelButtonLoading(false);
          }}
        >
          {cancelButton.label || "No"}
        </ButtonError>
      );
    else if (cancelButton) return cancelButton;
    else return null;
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      p={5}
    >
      <AvatarWarning>
        <WarningIcon />
      </AvatarWarning>
      <Typography
        align="center"
        sx={{
          pt: 4,
          px: 6,
        }}
        variant="h3"
      >
        {title || "Are you sure ?"}
      </Typography>

      {description && (
        <Typography
          align="center"
          sx={{
            pt: 2,
            pb: 4,
            px: 6,
          }}
          fontWeight="normal"
          color="text.secondary"
          variant="h4"
        >
          {description}
        </Typography>
      )}

      <Box sx={{ mt: 2 }}>
        {getConfirmButton(confirmButton)}
        {getCancelButton(cancelButton)}
      </Box>
    </Box>
  );
};
