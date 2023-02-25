// import { capitalize } from "../../../../utils";
import TextField from "@mui/material/TextField";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterMoment from "@mui/lab/AdapterMoment";
import { getValidDate } from "src/utils";

// const DatePickers = [DesktopDatePicker, MobileDatePicker];

export const DateTimeInput = (props) => {
  // let { datePickerType: type = "desktop", ...rest } = props;
  // if (!type) type = capitalize("desktop");
  // type = `${type}DatePicker`;
  // const Component = DatePickers[type];

  let { renderInput, helperText, error, onChange } = props;

  if (renderInput) {
    if (renderInput.props)
      renderInput = function renderInput(params) {
        return (
          <TextField
            fullWidth
            variant="outlined"
            className={props.className}
            {...renderInput.props}
            {...params}
            helperText={helperText}
            error={error}
          />
        );
      };
  } else {
    renderInput = function renderInput(params) {
      return (
        <TextField
          fullWidth
          variant="outlined"
          className={props.className}
          {...params}
          helperText={helperText}
          error={error}
        />
      );
    };
  }

  const getValue = () => {
    if (props.value) return getValidDate(new Date(props.value));
    return null;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePicker
        // inputFormat="DD/MM/YYYY"
        {...props}
        onChange={onChange}
        value={getValue()}
        renderInput={renderInput}
      />
    </LocalizationProvider>
  );
};
