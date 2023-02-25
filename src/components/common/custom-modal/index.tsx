import { EventEmitter } from "src/utils";
import { useEffect, useState } from "react";
import { ConfirmationModal, CONFIRMATION_MODAL_PROPS } from "src/components";
import {
  Dialog,
  DialogContent,
  DialogContentProps,
  DialogProps,
  styled,
} from "@mui/material";

// modal event
interface MODAL_CONTAINER_PROPS extends Omit<DialogProps, "open"> {
  closeOnOutsideClick?: boolean;
  open?: boolean;
}
export interface MODAL_EVENT_PROPS_1 {
  containerProps?: MODAL_CONTAINER_PROPS;
  contentContainerProps?: DialogContentProps;
  component?: CUSTOM_MODAL_COMPONENT;
  type?: "custom";
}
export interface MODAL_EVENT_PROPS_2 extends CONFIRMATION_MODAL_PROPS {
  containerProps?: MODAL_CONTAINER_PROPS;
  contentContainerProps?: DialogContentProps;
  type?: "confirmation";
}

export type MODAL_EVENT_PROPS = MODAL_EVENT_PROPS_1 | MODAL_EVENT_PROPS_2;

export type CUSTOM_MODAL_COMPONENT = React.FC<{ onCancel: Function }>;
export interface CUSTOM_MODAL_COMPONENT_PROPS {
  [key: string]: any;
  onCancel: Function;
}

declare global {
  interface Window {
    modal: (params: MODAL_EVENT_PROPS) => any;
  }
}

const DialogWrapper = styled(Dialog)(
  () => `
    // .MuiDialog-container {
    //     height: auto;
    // }
    
    .MuiDialog-paperScrollPaper {
        max-height: calc(100vh - 64px);
        max-width: fit-content !important;
        overflow: auto;
        box-sizing: border-box;
        padding: 20px;
    }
`
);

export const CustomModal = () => {
  const [modalDetails, setModalDetails] = useState<MODAL_EVENT_PROPS>({});
  const [visible, setVisible] = useState(false);
  //   const visibleRef = useRef(null);

  useEffect(() => {
    EventEmitter.addListener("modal", (params: MODAL_EVENT_PROPS) => {
      setModalDetails({ ...params, type: params.type || "custom" });
      setVisible((prev) => !prev);
      //   visibleRef.current = Date.now();
    });
  }, []);

  // useEffect(() => {
  //       setVisible((prev) => !prev);
  //     console.log('ref altered');
  //   }, [visibleRef.current]);

  let ModalBody = null;
  if (modalDetails.type === "custom") ModalBody = modalDetails.component;
  if (modalDetails.type === "confirmation") {
    const {
      type: _type,
      containerProps: _containerProps,
      ...confirmationModalProps
    } = modalDetails;
    ModalBody = function ModalBody(params) {
      return (
        <ConfirmationModal
          {...params}
          {...confirmationModalProps}
          sx={{
            minWidth: 500,
            // ...confirmationModalProps?.sx
          }}
          onConfirm={async (event) => {
            if (confirmationModalProps.onConfirm)
              await confirmationModalProps.onConfirm(event);
            setVisible(false);
          }}
          onCancel={async (event) => {
            if (confirmationModalProps.onCancel)
              await confirmationModalProps.onCancel(event);
            setVisible(false);
          }}
        />
      );
    };
  }

  return (
    <DialogWrapper
      {...modalDetails.containerProps}
      className={["custom-scrollbar", modalDetails.containerProps?.className]
        .filter((el) => el)
        .join(" ")}
      sx={{ width: "100vw", ...modalDetails.containerProps?.sx }}
      open={visible}
      onBackdropClick={(event) => {
        if (modalDetails.containerProps?.onBackdropClick)
          modalDetails.containerProps.onBackdropClick(event);
        if (modalDetails.containerProps?.closeOnOutsideClick) setVisible(false);
      }}
    >
      <DialogContent
        {...modalDetails.contentContainerProps}
        sx={{
          boxSizing: "border-box",
          padding: 0,
          ...modalDetails.contentContainerProps?.sx,
        }}
      >
        {ModalBody && <ModalBody onCancel={() => setVisible(false)} />}
      </DialogContent>
    </DialogWrapper>
  );
};

export * from "./components";
