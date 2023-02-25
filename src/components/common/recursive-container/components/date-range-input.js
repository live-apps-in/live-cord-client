import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterMoment from "@mui/lab/AdapterMoment";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DateRangePicker from "@mui/lab/DateRangePicker";
import { getValidDate } from "src/utils";

export const DateRangeInput = (props) => {
  const { onChange, ...rest } = props;

  const getValue = () => {
    if (Array.isArray(props.value))
      return props.value.map((date) => {
        if (date) return getValidDate(new Date(date)) || null;
        return null;
      });
    return [null, null];
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateRangePicker
        inputFormat="DD/MM/YYYY"
        calendars={2}
        renderInput={(startProps, endProps) => (
          <>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </>
        )}
        {...rest}
        value={getValue()}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
};
