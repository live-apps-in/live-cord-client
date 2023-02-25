import React from "react";
import InputMask from "react-input-mask";

export const MaskedText = React.forwardRef(function MaskedText(props, ref) {
  return (
    <InputMask
      overwrite
      alwaysShowMask={false}
      maskChar={null}
      {...props}
      inputRef={ref}
    />
  );
});
