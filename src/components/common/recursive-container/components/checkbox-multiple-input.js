import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormHelperText,
} from "@mui/material";
import { CheckboxInput } from "./checkbox-input";

export const CheckboxMultiple = ({
  containerProps = {},
  checkboxInputsContainerProps = {},
  orientation = "row",
  name,
  children = [],
  value = {},
  onChange,
  label,
  asArray = false,
  className,
  error,
  helperText,
  showSelectedOnly = false,
}) => {
  // name will me removed even if it is provided
  children = children.map((el) => ({ ...el, name: el.value }));

  // object | Array | null | undefined
  const [result, setResult] = useState(value || {});
  const [isAsArray, setIsAsArray] = useState(false);

  useEffect(() => {
    if (Array.isArray(value)) {
      let newValue = {};
      value.forEach((el) => (newValue[el] = true));
      setResult(newValue);
      if (asArray === undefined) setIsAsArray(true);
    } else setResult(value || {});
  }, [value]);

  useEffect(() => {
    if (asArray !== undefined) setIsAsArray(asArray);
  }, [asArray]);

  const handleChange = (event) => {
    const { value } = event.target;
    let newResult = { ...result };
    let resultAsArray = [];
    newResult[value] = !newResult[value];
    setResult(newResult);
    if (isAsArray) {
      resultAsArray = Object.keys(newResult)
        .map((el) => (newResult[el] ? el : null))
        .filter((el) => el);
    }
    let newEvent = {
      ...event,
      target: { ...event.target, value: isAsArray ? resultAsArray : newResult },
    };
    if (checkboxInputsContainerProps.onChange)
      checkboxInputsContainerProps.onChange(newEvent);
    onChange(newEvent);
  };

  return (
    <FormControl className={className} {...containerProps} component="fieldset">
      <FormLabel error={error} component="legend">
        {label}
      </FormLabel>
      <FormGroup
        row={orientation === "row"}
        {...checkboxInputsContainerProps}
        aria-label={name}
        name={name}
      >
        {children.map((el, index) => {
          let selected = result[el.name] || false;
          return (
            (selected || !showSelectedOnly) && (
              <CheckboxInput
                {...el}
                checked={selected}
                key={index}
                onClick={handleChange}
              />
            )
          );
        })}
      </FormGroup>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
};
