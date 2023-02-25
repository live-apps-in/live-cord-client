import React from "react";
import NumberFormat from "react-number-format";

export const CustomNumberInput = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, numberInputProps, ...other } = props;
  // console.log(other.value);
  return (
    <NumberFormat
      getInputRef={ref}
      onValueChange={onChange}
      thousandSeparator
      isNumericString
      width={"100%"}
      // prefix="$"
      {...numberInputProps}
      {...other}
      saveAs={undefined}
      containerProps={undefined}
    />
  );
});
