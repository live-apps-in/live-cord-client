import { Checkbox, FormControlLabel } from "@mui/material";

export const CheckboxInput = (props) => {
  const getCheckboxInputProps = (isCheckbox) => {
    const {
      label,
      value,
      containerProps,
      disabled,
      ...remainingCheckboxInputProps
    } = props;
    if (isCheckbox) return { ...remainingCheckboxInputProps };
    else return { label, containerProps, disabled, value };
  };
  return (
    <FormControlLabel
      {...getCheckboxInputProps()}
      containerProps={undefined}
      {...getCheckboxInputProps().containerProps}
      control={
        <Checkbox
          {...getCheckboxInputProps(true)}
          containerProps={undefined}
          {...getCheckboxInputProps(true).containerProps}
        />
      }
    />
  );
};
