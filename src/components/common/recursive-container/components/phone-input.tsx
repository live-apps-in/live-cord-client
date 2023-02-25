import MuiPhoneNumber from "material-ui-phone-number";
import { PHONE_INPUT_PROPS } from "src/components";
import { filterNumbers } from "src/utils";

export function PhoneInputComponent({
  onChange,
  value,
  ...rest
}: PHONE_INPUT_PROPS) {
  let alteredValue = `${value || ""}`;
  if (alteredValue) {
    alteredValue = alteredValue.toString();
  }
  if (alteredValue && !alteredValue.startsWith("+"))
    alteredValue = `+${alteredValue}`;
  if (!alteredValue) alteredValue = undefined;

  let inputProps: any = {
    disabled: false,
    ...rest.inputProps,
  };
  if (rest.required) {
    inputProps = {
      ...inputProps,
      pattern: ".{6,}",
      title: "Phone number is required",
    };
  }

  const changeHandler = (phone: any) => {
    if (onChange) onChange(filterNumbers(phone));
  };

  return (
    <MuiPhoneNumber
      variant="outlined"
      defaultCountry="ci"
      {...rest}
      inputProps={{
        ...inputProps,
        placeholder: rest.placeholder || inputProps.placeholder,
        disabled: rest.disabled || inputProps.disabled,
      }}
      disableDropdown={rest.disabled || inputProps.disabled}
      value={alteredValue}
      onChange={changeHandler}
    />
  );
}
