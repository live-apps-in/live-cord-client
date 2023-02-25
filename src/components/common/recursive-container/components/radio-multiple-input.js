import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormHelperText,
} from "@mui/material";
import { RadioInput } from "./radio-input";

export const RadioMultiple = ({
  containerProps = {},
  radioInputsContainerProps = {},
  orientation = "row",
  name,
  children = [],
  value,
  onChange,
  label,
  asObject,
  className,
  error,
  helperText,
}) => {
  // name will me removed even if it is provided
  children = children.map((el) => ({
    ...el,
    name: el.value,
    value: el.value || "",
    label: el.label || "",
  }));

  const [result, setResult] = useState(null);
  const [isAsObject, setIsAsObject] = useState(false);

  useEffect(() => {
    if (typeof value === "object") {
      let newResult = null;
      Object.keys(value || {}).forEach((el) => {
        if (value && value[el]) newResult = el;
      });
      setResult(newResult);
      if (asObject === undefined) setIsAsObject(true);
    } else setResult(value || null);
  }, [value]);

  useEffect(() => {
    if (asObject !== undefined) setIsAsObject(asObject);
  }, [asObject]);

  const handleChange = (event) => {
    let newEvent = { ...event };
    if (onChange) {
      if (newEvent.target.value === result)
        newEvent = { ...newEvent, target: { ...newEvent.target, value: null } };
    }
    setResult(newEvent.target.value);
    if (isAsObject && newEvent.target.value) {
      newEvent = {
        ...newEvent,
        target: {
          ...newEvent.target,
          value: { [newEvent.target.name]: !!newEvent.target.value },
        },
      };
    }
    if (radioInputsContainerProps.onChange)
      radioInputsContainerProps.onChange(newEvent);
    onChange(newEvent);
  };
  return (
    <FormControl className={className} component="fieldset" {...containerProps}>
      <FormLabel error={error} component="legend">
        {label}
      </FormLabel>
      <RadioGroup
        row={orientation === "row"}
        {...radioInputsContainerProps}
        value={result || ""}
        aria-label={name}
        name={name}
      >
        {children.map((el, index) => (
          <RadioInput {...el} key={index} onClick={handleChange} />
        ))}
      </RadioGroup>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
};
