import FormHelperText from "@mui/material/FormHelperText";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { getValidDate } from "src/utils";
import InputLabel from "@mui/material/InputLabel";

export const MultipleDatePicker = (props) => {
  // const [isOpen, setIsOpen] = useState(false);

  const {
    onChange,
    value,
    // trigger: Trigger,
    helperText,
    error,
    disabledDays,
    ...rest
  } = props;

  const getValue = () => {
    if (Array.isArray(value))
      return value
        .map((date) => {
          if (date) return getValidDate(new Date(date)) || null;
          return null;
        })
        .filter((el) => el);
    return [];
  };

  const handleDayClick = (day, { selected }) => {
    let selectedDays = getValue().concat();
    if (selected) {
      const selectedIndex = selectedDays.findIndex((selectedDay) =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    onChange(selectedDays);
  };

  const alteredDisabledDays = disabledDays.map((el) => {
    if (Object.prototype.toString.call(el) === "[object Date]")
      return new Date(el);
    return el;
  });

  return (
    <>
      {/* {Trigger ? (
        React.cloneElement(Trigger, {
          onClick: () => setIsOpen((prev) => !prev),
        })
      ) : (
        <CustomButton onClick={() => setIsOpen((prev) => !prev)}>
          Choose Dates
        </CustomButton>
      )} */}
      <InputLabel sx={{ mb: 1 }} id={rest.id} error={error}>
        {rest.label && (rest.isRequired ? `${rest.label} *` : rest.label)}{" "}
      </InputLabel>
      <DayPicker
        {...rest}
        disabledDays={alteredDisabledDays}
        selectedDays={getValue() || []}
        onDayClick={handleDayClick}
      />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </>
  );
};
