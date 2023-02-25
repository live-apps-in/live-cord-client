import { Radio, FormControlLabel } from "@mui/material";

export const RadioInput = (props) => {
  const getRadioInputProps = (isRadio) => {
    const {
      label,
      value,
      containerProps,
      disabled,
      name,
      ...remainingRadioInputProps
    } = props;
    if (isRadio) return { ...remainingRadioInputProps };
    else return { label, containerProps, disabled, value, name };
  };
  return (
    <FormControlLabel
      {...getRadioInputProps()}
      containerProps={undefined}
      {...getRadioInputProps().containerProps}
      control={
        <Radio
          {...getRadioInputProps(true)}
          containerProps={undefined}
          {...getRadioInputProps(true).containerProps}
        />
      }
    />
  );
};
