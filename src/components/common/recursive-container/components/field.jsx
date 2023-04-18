import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ColorPicker } from "material-ui-color";
import {
  TextField,
  InputAdornment,
  IconButton,
  InputLabel,
  FormHelperText,
  FormLabel,
  Box,
  Slider,
} from "@mui/material";
import { MaterialSelect } from "./material-select";
import { accessValueByDotNotation, isRequiredField, uniqId } from "src/utils";
import { PhoneInputComponent } from "./phone-input";
import { FileInput } from "./file-input";
import { RadioInput } from "./radio-input";
import { RadioMultiple } from "./radio-multiple-input";
import { CheckboxInput } from "./checkbox-input";
import { CheckboxMultiple } from "./checkbox-multiple-input";
import { DateInput } from "./date-input";
import { DateTimeInput } from "./date-time-input";
import { TimeInput } from "./time-input";
import { CustomNumberInput } from "./number-input";
import { MaskedText } from "./masked-text";
import { DateRangeInput } from ".";
import { MultipleDatePicker } from "./multiple-date-picker";
import { DebounceInput } from "react-debounce-input";

export const Field = (props) => {
  const { validationSchema, formik, type, name, addon, onChange, ...rest } =
    props;
  const [passwordOpen, setPasswordOpen] = useState(false);
  const isRequired =
    validationSchema &&
    (isRequiredField(validationSchema, name) || rest.isRequired);
  const errorValue =
    formik.errors && accessValueByDotNotation(formik.errors, name || "");
  const error =
    formik.errors &&
    (typeof errorValue === "object" ? "Invalid Value" : errorValue);
  let value = accessValueByDotNotation(formik.values, name || "");
  // if (type === "date") value = value && new Date(value);
  const touched = !!accessValueByDotNotation(formik.touched, name || "");
  const addonPosition = addon && addon.position ? addon.position : "end";
  const id = uniqId();

  switch (type) {
    case "text":
      return (
        <TextField
          {...rest}
          value={value}
          label={rest.label && (isRequired ? `${rest.label} *` : rest.label)}
          name={name}
          type="text"
          error={error && touched}
          helperText={
            error && touched ? error || rest.helperText : rest.helperText
          }
          onChange={(e) => {
            if (onChange) onChange(e);
            formik.handleChange(e);
          }}
          InputProps={{
            [`${addonPosition}Adornment`]: addon && (
              <InputAdornment position={addonPosition}>
                {addon.component}
              </InputAdornment>
            ),
            ...rest.InputProps,
          }}
        />
      );
    case "password":
      return (
        <TextField
          {...rest}
          value={value}
          label={rest.label && (isRequired ? `${rest.label} *` : rest.label)}
          name={name}
          type={passwordOpen ? "text" : "password"}
          error={error && touched}
          helperText={
            error && touched ? error || rest.helperText : rest.helperText
          }
          onChange={(e) => {
            if (onChange) onChange(e);
            formik.handleChange(e);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position={addonPosition}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setPasswordOpen((prev) => !prev)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge={addonPosition}
                >
                  {passwordOpen ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
                {addon && addonPosition === "end" && addon.component}
              </InputAdornment>
            ),
            startAdornment: addonPosition === "start" && addon && (
              <InputAdornment position="start">
                {addon.component}
              </InputAdornment>
            ),
            ...rest.InputProps,
          }}
        />
      );
    case "masked-text":
      return (
        <TextField
          fullWidth
          {...rest}
          label={rest.label && (isRequired ? `${rest.label} *` : rest.label)}
          value={value}
          onChange={(event) => {
            formik.setFieldValue(name, event.target.value);
            if (onChange) onChange(event.target.value);
          }}
          name={name}
          containerProps={undefined} // to remove the "Invalid DOM property" warning in console
          InputProps={{
            [`${addonPosition}Adornment`]: addon && (
              <InputAdornment position={addonPosition}>
                {addon.component}
              </InputAdornment>
            ),
            ...rest.InputProps,
            inputComponent: MaskedText,
          }}
          inputProps={rest.containerProps}
          error={error && touched}
          helperText={
            error && touched ? error || rest.helperText : rest.helperText
          }
        />
      );
    case "debounced-input":
      return (
        <DebounceInput
          {...rest}
          label={rest.label && (isRequired ? `${rest.label} *` : rest.label)}
          value={value}
          onChange={(event) => {
            formik.setFieldValue(name, event.target.value);
            if (onChange) onChange(event);
          }}
          name={name}
          containerProps={undefined} // to remove the "Invalid DOM property" warning in console
          InputProps={{
            [`${addonPosition}Adornment`]: addon && (
              <InputAdornment position={addonPosition}>
                {addon.component}
              </InputAdornment>
            ),
            ...rest.InputProps,
          }}
          inputProps={rest.containerProps}
          error={error && touched}
          helperText={
            error && touched ? error || rest.helperText : rest.helperText
          }
        />
      );
    case "number":
      return (
        <TextField
          fullWidth
          {...rest}
          saveAs={undefined} // to remove the "Invalid DOM property" warning in console
          label={rest.label && (isRequired ? `${rest.label} *` : rest.label)}
          value={value}
          onChange={(values) => {
            const formikValue =
              values[rest.saveAs || "floatValue"] === 0
                ? 0
                : values[rest.saveAs || "floatValue"] || "";
            formik.setFieldValue(name, formikValue);
            if (onChange) onChange(values);
          }}
          name={name}
          numberInputProps={undefined} // to remove the "Invalid DOM property" warning in console
          InputProps={{
            [`${addonPosition}Adornment`]: addon && (
              <InputAdornment position={addonPosition}>
                {addon.component}
              </InputAdornment>
            ),
            ...rest.InputProps,
            inputComponent: CustomNumberInput,
          }}
          inputProps={rest.numberInputProps}
          error={error && touched}
          helperText={
            error && touched ? error || rest.helperText : rest.helperText
          }
        />
      );
    case "phone":
      return (
        <PhoneInputComponent
          {...rest}
          label={rest.label && (isRequired ? `${rest.label} *` : rest.label)}
          name={name}
          error={error && touched}
          value={value}
          helperText={
            error && touched ? error || rest.helperText : rest.helperText
          }
          onChange={(phoneNumber) => {
            // let phone: any = phoneNumber;
            // phone = filterNumbers(phone);
            if (onChange) onChange(phoneNumber);
            formik.setFieldValue(name, phoneNumber);
          }}
        />
        // <TextField
        // {...rest}
        // name={name}
        // error={error && touched}
        // value={value}
        // helperText={
        //   error && touched ? error || rest.helperText : rest.helperText
        // }
        // onChange={(event) => {
        //   let phone: any = event.target.value;
        //   phone = filterNumbers(phone);
        //   if (onChange) onChange(phone);
        //   formik.setFieldValue(name, phone);
        // }}
        //   InputProps={{ inputComponent: PhoneInputComponent as any }}
        //   variant="standard"
        // />
      );
    case "select":
      return (
        <MaterialSelect
          {...rest}
          label={rest.label && (isRequired ? `${rest.label} *` : rest.label)}
          name={name}
          value={value}
          formik={formik}
          options={rest.options}
          error={error && touched}
          helperText={
            error && touched ? error || rest.helperText : rest.helperText
          }
          containerProps={{
            ...rest.containerProps,
          }}
          // inputProps={{
          //   [`${addonPosition}Adornment`]: addon && (
          //     <InputAdornment position={addonPosition}>
          //       {addon.component}
          //     </InputAdornment>
          //   ),
          //   ...rest.inputProps,
          // }}
        />
      );
    case "file":
      return (
        <Box width="100%" {...rest.containerProps}>
          <InputLabel
            sx={{ mb: 1 }}
            id={rest.id || id}
            error={error && touched}
          >
            {rest.label && (isRequired ? `${rest.label} *` : rest.label)}{" "}
          </InputLabel>
          <FileInput
            id={id}
            {...rest}
            name={name}
            onChange={(file) => {
              if (onChange) onChange(file);
              formik.setFieldValue(name, file);
            }}
            value={value}
          />
          <FormHelperText sx={{ mt: 1 }} error={error && touched}>
            {error && touched ? error || rest.helperText : rest.helperText}
          </FormHelperText>
        </Box>
      );
    case "checkbox":
      return (
        <CheckboxInput
          {...rest}
          error={error && touched}
          helperText={
            error && touched ? error || rest.helperText : rest.helperText
          }
          label={rest.label && (isRequired ? `${rest.label} *` : rest.label)}
          value={value}
          name={name}
          onChange={(event) => {
            if (onChange) onChange(event);
            formik.setFieldValue(name, event.target.checked);
          }}
          // defaultChecked={!!value}
          checked={!!value}
        />
      );
    case "checkbox-multiple":
      return (
        <CheckboxMultiple
          value={value}
          name={name}
          {...rest}
          error={error && touched}
          helperText={
            error && touched ? error || rest.helperText : rest.helperText
          }
          label={rest.label && (isRequired ? `${rest.label} *` : rest.label)}
          onChange={(event) => {
            if (onChange) onChange(event);
            formik.setFieldValue(name, event.target.value);
          }}
        />
      );
    case "radio":
      return (
        <RadioInput
          {...rest}
          error={error && touched}
          helperText={
            error && touched ? error || rest.helperText : rest.helperText
          }
          label={rest.label && (isRequired ? `${rest.label} *` : rest.label)}
          name={name}
          checked={!!value}
          value={!!value}
          onClick={(event) => {
            if (onChange) onChange(event);
            formik.setFieldValue(name, event.target.checked);
          }}
        />
      );
    case "radio-multiple":
      return (
        <RadioMultiple
          {...rest}
          error={error && touched}
          helperText={
            error && touched ? error || rest.helperText : rest.helperText
          }
          label={rest.label && (isRequired ? `${rest.label} *` : rest.label)}
          name={name}
          value={value}
          onChange={(event) => {
            if (onChange) onChange(event);
            formik.setFieldValue(name, event.target.value);
          }}
        />
      );
    case "date":
      return (
        <DateInput
          {...rest}
          label={rest.label && (isRequired ? `${rest.label} *` : rest.label)}
          name={name}
          value={value}
          onChange={(date) => {
            if (onChange) onChange(date);
            formik.setFieldValue(name, date);
          }}
          error={error && touched}
          helperText={
            error && touched ? error || rest.helperText : rest.helperText
          }
        />
      );
    case "date-time":
      return (
        <DateTimeInput
          {...rest}
          label={rest.label && (isRequired ? `${rest.label} *` : rest.label)}
          name={name}
          value={value}
          onChange={(date) => {
            if (onChange) onChange(date);
            formik.setFieldValue(name, date);
          }}
          error={error && touched}
          helperText={
            error && touched ? error || rest.helperText : rest.helperText
          }
        />
      );
    case "date-range":
      return (
        <DateRangeInput
          {...rest}
          label={rest.label && (isRequired ? `${rest.label} *` : rest.label)}
          name={name}
          value={value}
          onChange={(date) => {
            if (onChange) onChange(date);
            formik.setFieldValue(name, date);
          }}
          error={error && touched}
          helperText={
            error && touched ? error || rest.helperText : rest.helperText
          }
        />
      );
    case "multiple-date":
      return (
        <MultipleDatePicker
          {...rest}
          isRequired={isRequired}
          label={rest.label && (isRequired ? `${rest.label} *` : rest.label)}
          name={name}
          value={value}
          onChange={(dates) => {
            if (onChange) onChange(dates);
            formik.setFieldValue(name, dates);
          }}
          error={error && touched}
          helperText={
            error && touched ? error || rest.helperText : rest.helperText
          }
        />
      );
    case "time":
      return (
        <TimeInput
          {...rest}
          label={rest.label && (isRequired ? `${rest.label} *` : rest.label)}
          name={name}
          value={value}
          onChange={(date) => {
            if (onChange) onChange(date);
            formik.setFieldValue(name, date);
          }}
          error={error && touched}
          helperText={
            error && touched ? error || rest.helperText : rest.helperText
          }
        />
      );
    case "color":
      return (
        <Box {...rest.containerProps}>
          <InputLabel
            sx={{ mb: 1 }}
            id={rest.id || id}
            error={error && touched}
          >
            {rest.label && (isRequired ? `${rest.label} *` : rest.label)}{" "}
          </InputLabel>
          <ColorPicker
            {...rest}
            value={value || ""}
            onChange={(value) => {
              value = `#${value.hex}`;
              if (onChange) onChange(value);
              formik.setFieldValue(name, value);
            }}
          />
          <FormHelperText error={error && touched}>
            {error && touched ? error || rest.helperText : rest.helperText}
          </FormHelperText>
        </Box>
      );
    case "slider":
      return (
        <Box width="90%" {...rest.containerProps}>
          <InputLabel
            sx={{ mb: 1 }}
            id={rest.id || id}
            error={error && touched}
          >
            {rest.label && (isRequired ? `${rest.label} *` : rest.label)}{" "}
          </InputLabel>
          <Slider
            {...rest}
            sx={{ ml: 2, ...rest.sx }}
            name={name}
            defaultValue={value}
            value={value}
            onChange={({ target: { value } }) => {
              if (onChange) onChange(value);
              formik.setFieldValue(name, value);
            }}
          />
          <FormHelperText error={error && touched}>
            {error && touched ? error || rest.helperText : rest.helperText}
          </FormHelperText>
        </Box>
      );
    // case "array":
    //   return children.length > 0 ? (
    //     <RecursiveContainer
    //       formContainer={rest.formContainer}
    //       className={rest.className}
    //       config={children || []}
    //       formik={formik}
    //       validationSchema={validationSchema}
    //     />
    //   ) : null;
    case "component":
      return (
        <>
          {rest.label && (
            <FormLabel error={error}>
              {rest.label && (isRequired ? `${rest.label} *` : rest.label)}
            </FormLabel>
          )}
          {rest.component}
          {rest.showError && (
            <FormHelperText error={error}>
              {error ? error || rest.helperText : rest.helperText}
            </FormHelperText>
          )}
        </>
      );
    default:
      return (
        <TextField
          {...rest}
          value={value}
          label={rest.label && (isRequired ? `${rest.label} *` : rest.label)}
          name={name}
          type="text"
          error={error && touched}
          helperText={
            error && touched ? error || rest.helperText : rest.helperText
          }
          onChange={(e) => {
            if (onChange) onChange(e);
            formik.handleChange(e);
          }}
          InputProps={{
            [`${addonPosition}Adornment`]: addon && (
              <InputAdornment position={addonPosition}>
                {addon.component}
              </InputAdornment>
            ),
            ...rest.InputProps,
          }}
        />
      );
  }
};
