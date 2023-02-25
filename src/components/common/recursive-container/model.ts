// material-ui-phone-number
import type { MuiPhoneNumberProps } from "material-ui-phone-number";
import type { SelectProps } from "@mui/material/Select";
import type { FormControlProps } from "@mui/material/FormControl";
import type { BoxProps } from "@mui/material/Box";
import type { SliderProps } from "@mui/material/Slider";
import type { CheckboxProps } from "@mui/material/Checkbox/Checkbox";
import type { FormControlLabelProps } from "@mui/material/FormControlLabel";
import type { FormGroupProps } from "@mui/material/FormGroup";
import type { ChangeEvent, JSXElementConstructor, ReactElement } from "react";
import type { RadioProps } from "@mui/material/Radio";
import { RadioGroupProps, TextFieldProps, TextField } from "@mui/material";
import {
  DatePickerProps,
  DateTimePickerProps,
  TimePickerProps,
} from "@mui/lab";
import { DayPickerProps } from "react-day-picker";
import type MaskInput from "react-input-mask";
import type { NumberFormatProps } from "react-number-format";
import { Overwrite } from "src/model";
import { DebounceInputProps } from 'react-debounce-input';

// form-elements / recursive-container

export type CUSTOM_DEBOUNCE_INPUT_PROPS = TextFieldProps & DebounceInputProps<typeof TextField, TextFieldProps>
// phone input props

export interface PHONE_INPUT_PROPS
  extends Omit<MuiPhoneNumberProps, "value" | "onChange"> {
  value?: string | number | null;
  pattern?: string | null;
  onChange?: (
    e: number | string
    // ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => any;
}

// phone input props

export interface SELECT_INPUT_PROPS
  extends Omit<SelectProps, "value" | "onChange" | "options" | "multiple"> {
  containerProps?: FormControlProps;
  value?: string | { value: any; label: any }[] | string[] | null;
  onChange?: (
    value: string | { value: any; label: any }[] | string[] | null
  ) => any;
  labelAccessor?: string;
  valueAccessor?: string;
  isString?: boolean;
  valueIsString?: boolean;
  optionIsString?: boolean;
  retriveOtherKeys?: boolean;
  helperText?: any;
  options:
    | {
        [
          label:
            | SELECT_INPUT_PROPS["labelAccessor"]
            | SELECT_INPUT_PROPS["valueAccessor"]
        ]: any;
      }[]
    | string[];
  formik?: any;
  multiple?: boolean;
}

// file input

export interface FILE_INPUT_PROPS {
  onChange?: (e: File | null) => any;
  value?: File | null;
  supportedFormats?: Array<string>;
  downloadName?: string;
  isDownloadable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  convertToBase64?: boolean;
  name?: string;
  containerProps?: BoxProps;
  returnCompleteFileDetails?: boolean;
}

// slider props
export interface SLIDER_INPUT_PROPS extends SliderProps {
  containerProps?: BoxProps;
}

// checkbox input
export interface CHECKBOX_INPUT_PROPS extends CheckboxProps {
  containerProps?: Omit<FormControlLabelProps, "control" | "label">;
}
// checkbox-multiple input
export interface CHECKBOX_MULTIPLE_INPUT_PROPS {
  containerProps?: FormControlProps;
  checkboxInputsContainerProps?: FormGroupProps;
  orientation?: "row" | "column";
  name?: string;
  children: Omit<CHECKBOX_INPUT_FIELD_PROPS, "name">[];
  value?: object | Array<string> | Array<number> | null;
  label?: any;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => any;
  asArray?: boolean;
  className?: string;
  showSelectedOnly?: boolean;
}
// radio input
export interface RADIO_INPUT_PROPS extends Omit<RadioProps, "name"> {
  containerProps?: FormControlLabelProps;
  name?: string;
}
// radio-multiple input
export interface RADIO_MULTIPLE_INPUT_PROPS {
  containerProps?: FormControlProps;
  radioInputsContainerProps?: RadioGroupProps;
  orientation?: "row" | "column";
  name?: string;
  children: Omit<RADIO_INPUT_FIELD_PROPS, "name">[];
  value?: object | string | number | null;
  label?: any;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => any;
  asObject?: boolean;
  className?: string;
}

// date input
interface DATE_INPUT_PROPS
  extends Omit<DatePickerProps, "renderInput" | "onChange" | "value"> {
  value?: unknown;
  onChange?(date: unknown, keyboardInputValue?: string | undefined): void;
  renderInput?:
    | ((
        props: TextFieldProps
      ) => ReactElement<any, string | JSXElementConstructor<any>>)
    | { props: TextFieldProps };
  className?: string;
}
// date-time input
interface DATE_TIME_INPUT_PROPS
  extends Omit<DateTimePickerProps, "renderInput" | "onChange" | "value"> {
  value?: unknown;
  onChange?(date: unknown, keyboardInputValue?: string | undefined): void;
  renderInput?:
    | ((
        props: TextFieldProps
      ) => ReactElement<any, string | JSXElementConstructor<any>>)
    | { props: TextFieldProps };
  className?: string;
}
// date-range-input
interface DATE_RANGE_INPUT_PROPS
  extends Omit<DateTimePickerProps, "onChange" | "value" | "renderInput"> {
  value?: unknown;
  renderInput?: DateTimePickerProps["renderInput"];
  onChange?(date: unknown, keyboardInputValue?: string | undefined): void;
  className?: string;
}
// multiple-date-input
interface MULTIPLE_DATE_INPUT_PROPS extends Omit<DayPickerProps, "value"> {
  value?: Array<Date> | null | undefined;
  className?: string;
}
// time input
interface TIME_INPUT_PROPS
  extends Omit<TimePickerProps, "renderInput" | "onChange" | "value"> {
  value?: unknown;
  onChange?(date: unknown, keyboardInputValue?: string | undefined): void;
  renderInput?:
    | ((
        props: TextFieldProps
      ) => ReactElement<any, string | JSXElementConstructor<any>>)
    | { props: TextFieldProps };
  className?: string;
}
// component input props
interface COMPONENT_INPUT_PROPS {
  component: JSX.Element | string | null;
  containerProps?: BoxProps;
  showError?: boolean;
}
// number input props
type NUMBER_INPUT_PROPS = TextFieldProps & {
  numberInputProps?: NumberFormatProps<unknown>;
  saveAs?: "floatValue" | "formattedValue" | "value";
};
// masked-text input props
type MASKED_TEXT_PROPS = TextFieldProps & {
  containerProps?: MaskInput.Props;
};

// Recursive component

interface CONFIG_BASE {
  name?: string;
  label?: string | null;
}

// field
// interface FIELD_TYPE {
//   type?:
//     | "text"
//     | "password"
//     | "select"
//     | "email"
//     | "color"
//     | "number"
//     | "phone"
//     | "file"
//     | "array"
//     | "date"
//     | "checkbox"
//     | "radio"
//     | "radio-multiple"
//     | "image"
//     | "component"
//     | null;
// }

// type property for each field type component
interface TEXT_FIELD_TYPE {
  type?: "text" | "password" | "email" | "color" | "";
}
interface DEBOUNCE_INPUT_TYPE {
  type?: "debounce-input";
}
interface PHONE_FIELD_TYPE {
  type?: "phone";
}
interface SELECT_FIELD_TYPE {
  type?: "select";
}
interface FILE_INPUT_FIELD_TYPE {
  type?: "file";
}
interface CHECKBOX_INPUT_FIELD_TYPE {
  type?: "checkbox";
}
interface CHECKBOX_MULTIPLE_INPUT_FIELD_TYPE {
  type?: "checkbox-multiple";
}
interface RADIO_INPUT_FIELD_TYPE {
  type?: "radio";
}
interface RADIO_MULTIPLE_INPUT_FIELD_TYPE {
  type?: "radio-multiple";
}
interface DATE_INPUT_FIELD_TYPE {
  type?: "date";
}
interface DATE_TIME_INPUT_FIELD_TYPE {
  type?: "date-time";
}
interface DATE_RANGE_INPUT_FIELD_TYPE {
  type?: "date-range";
}
interface MULTIPLE_DATE_INPUT_FIELD_TYPE {
  type?: "multiple-date";
}
interface TIME_INPUT_FIELD_TYPE {
  type?: "time";
}
interface COMPONENT_INPUT_FIELD_TYPE {
  type?: "component";
}
interface NUMBER_INPUT_FIELD_TYPE {
  type?: "number";
}
interface MASKED_TEXT_FIELD_TYPE {
  type?: "masked-text";
}
interface SLIDER_INPUT_FIELD_TYPE {
  type?: "slider";
}

// text field
type TEXT_FIELD_PROPS = Overwrite<
  TextFieldProps & CONFIG_BASE,
  TEXT_FIELD_TYPE
> & {
  // other manually defined properties
  addon?: null | {
    position?: "end" | "start" | null;
    component: null | ReactElement;
  };
};
// debounce-input
type DEBOUNCE_INPUT_PROPS = Overwrite<
  CUSTOM_DEBOUNCE_INPUT_PROPS & CONFIG_BASE,
  DEBOUNCE_INPUT_TYPE
> & {
  // other manually defined properties
  addon?: null | {
    position?: "end" | "start" | null;
    component: null | ReactElement;
  };
};
// phone field
type PHONE_FIELD_PROPS = Overwrite<
  PHONE_INPUT_PROPS & CONFIG_BASE,
  PHONE_FIELD_TYPE
> & {
  // other manually defined properties
  addon?: null | {
    position?: "end" | "start" | null;
    component: null | ReactElement;
  };
};
// select field
type SELECT_FIELD_PROPS = Overwrite<
  SELECT_INPUT_PROPS & CONFIG_BASE,
  SELECT_FIELD_TYPE
>;
// & {
//   // other manually defined properties
//   addon?: null | {
//     position?: "end" | "start" | null;
//     component: null | ReactElement;
//   };
// };

// file field
type FILE_INPUT_FIELD_PROPS = Overwrite<
  FILE_INPUT_PROPS & CONFIG_BASE,
  FILE_INPUT_FIELD_TYPE
>;
// checkbox field
type CHECKBOX_INPUT_FIELD_PROPS = Overwrite<
  CHECKBOX_INPUT_PROPS & CONFIG_BASE,
  CHECKBOX_INPUT_FIELD_TYPE
>;
// checkbox-multiple field
type CHECKBOX_MULTIPLE_INPUT_FIELD_PROPS = Overwrite<
  CHECKBOX_MULTIPLE_INPUT_PROPS & CONFIG_BASE,
  CHECKBOX_MULTIPLE_INPUT_FIELD_TYPE
>;
// radio field
type RADIO_INPUT_FIELD_PROPS = Overwrite<
  RADIO_INPUT_PROPS & CONFIG_BASE,
  RADIO_INPUT_FIELD_TYPE
>;
// radio-multiple field
type RADIO_MULTIPLE_INPUT_FIELD_PROPS = Overwrite<
  RADIO_MULTIPLE_INPUT_PROPS & CONFIG_BASE,
  RADIO_MULTIPLE_INPUT_FIELD_TYPE
>;
// date field
type DATE_INPUT_FIELD_PROPS = Overwrite<
  DATE_INPUT_PROPS & CONFIG_BASE,
  DATE_INPUT_FIELD_TYPE
>;
// date-time field
type DATE_TIME_INPUT_FIELD_PROPS = Overwrite<
  DATE_TIME_INPUT_PROPS & CONFIG_BASE,
  DATE_TIME_INPUT_FIELD_TYPE
>;
// date-range field
type DATE_RANGE_INPUT_FIELD_PROPS = Overwrite<
  DATE_RANGE_INPUT_PROPS & CONFIG_BASE,
  DATE_RANGE_INPUT_FIELD_TYPE
>;
// multiple-date-input field
type MULTIPLE_DATE_INPUT_FIELD_PROPS = Overwrite<
  MULTIPLE_DATE_INPUT_PROPS & CONFIG_BASE,
  MULTIPLE_DATE_INPUT_FIELD_TYPE
>;
// time field
type TIME_INPUT_FIELD_PROPS = Overwrite<
  TIME_INPUT_PROPS & CONFIG_BASE,
  TIME_INPUT_FIELD_TYPE
>;
// component type
type COMPONENT_FIELD_PROPS = Overwrite<
  COMPONENT_INPUT_PROPS & CONFIG_BASE,
  COMPONENT_INPUT_FIELD_TYPE
>;
// slider type
type SLIDER_FIELD_PROPS = Overwrite<
  SLIDER_INPUT_PROPS & CONFIG_BASE,
  SLIDER_INPUT_FIELD_TYPE
>;
// number field
type NUMBER_FIELD_PROPS = Overwrite<
  NUMBER_INPUT_PROPS & CONFIG_BASE,
  NUMBER_INPUT_FIELD_TYPE
> & {
  // other manually defined properties
  addon?: null | {
    position?: "end" | "start" | null;
    component: null | ReactElement;
  };
};
// masked-text field
type MASKED_TEXT_FIELD_PROPS = Overwrite<
  MASKED_TEXT_PROPS & CONFIG_BASE,
  MASKED_TEXT_FIELD_TYPE
> & {
  // other manually defined properties
  addon?: null | {
    position?: "end" | "start" | null;
    component: null | ReactElement;
  };
};

// field props
export type FIELD_PROPS = (
  | TEXT_FIELD_PROPS
  | DEBOUNCE_INPUT_PROPS
  | PHONE_FIELD_PROPS
  | SELECT_FIELD_PROPS
  | FILE_INPUT_FIELD_PROPS
  | CHECKBOX_INPUT_FIELD_PROPS
  | CHECKBOX_MULTIPLE_INPUT_FIELD_PROPS
  | RADIO_INPUT_FIELD_PROPS
  | RADIO_MULTIPLE_INPUT_FIELD_PROPS
  | DATE_INPUT_FIELD_PROPS
  | DATE_TIME_INPUT_FIELD_PROPS
  | DATE_RANGE_INPUT_FIELD_PROPS
  | MULTIPLE_DATE_INPUT_FIELD_PROPS
  | TIME_INPUT_FIELD_PROPS
  | COMPONENT_FIELD_PROPS
  | NUMBER_FIELD_PROPS
  | MASKED_TEXT_FIELD_PROPS
  | SLIDER_FIELD_PROPS
) & {
  // other manually defined properties
  validationSchema?: any;
  formik?: any;
  isRequired?: boolean | null;
  container?: React.FC<{ children?: React.ReactNode }>;
};

export type CONFIG_TYPE = FIELD_PROPS[];

export interface RECURSIVE_CONTAINER_PROPS {
  config: CONFIG_TYPE;
  formik: any;
  validationSchema?: any;
  formContainerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  formContainer?: null | React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
    //  & { form: ReactElement<any, any> }
  >;
}
