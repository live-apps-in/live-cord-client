import {
  uniqId,
  accessValueByDotNotation,
  convertDropDownObject,
  ignoreEmptyObject,
  isValidDropdownValue,
} from "src/utils";
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormHelperText,
  InputLabel,
  FormControl,
} from "@mui/material";

export const MaterialSelect = ({
  formik = undefined,
  options = [],
  labelAccessor = "label",
  valueAccessor = "value",
  isString = false,
  valueIsString = false,
  optionIsString = false,
  retriveOtherKeys = false,
  name = "",
  value,
  helperText = "",
  containerProps = {},
  ...rest
}) => {
  const id = uniqId();
  // little configuration
  if (isString) {
    valueIsString = valueIsString === undefined || valueIsString === null;
    optionIsString = optionIsString === undefined || optionIsString === null;
  }
  options = options
    .map((el) => ignoreEmptyObject(el))
    .filter((el) => isValidDropdownValue(el));

  // ---------------------- //

  let selectedOption = ignoreEmptyObject(
    formik ? accessValueByDotNotation(formik.values, name) : value
  );

  if (rest.multiple)
    selectedOption = (selectedOption || []).map((option) =>
      convertDropDownObject({
        value: option,
        valueAccessor,
        labelAccessor,
        retriveOtherKeys,
        isString: isString || valueIsString,
      })
    );
  else
    selectedOption =
      convertDropDownObject({
        value: selectedOption,
        valueAccessor,
        labelAccessor,
        isString: isString || valueIsString,
        retriveOtherKeys,
      }) || (rest.multiple ? [] : null);

  options = (options || []).map((option) =>
    convertDropDownObject({
      value: option,
      isString: isString || optionIsString,
      valueAccessor,
      labelAccessor,
      retriveOtherKeys,
    })
  );

  const onChange = ({ target: { value: option } }) => {
    if (rest.multiple) {
      option = option || [];
      option = option
        .map((el) => options.find((ele) => ele.label === el))
        .filter((el) => isValidDropdownValue(el));
    } else {
      option = options.find((el) => el.value === option);
    }
    let value = rest.multiple
      ? (option || []).map((option) =>
          convertDropDownObject({
            value: option,
            valueAccessor,
            labelAccessor,
            isString: isString || valueIsString,
            isReverse: true,
            retriveOtherKeys,
          })
        )
      : convertDropDownObject({
          value: option,
          valueAccessor,
          labelAccessor,
          isString: isString || valueIsString,
          isReverse: true,
          retriveOtherKeys,
        });
    if (formik) formik.setFieldValue(name, value);
    if (rest.onChange) rest.onChange(value);
  };

  const getValue = () => {
    if (options) {
      return rest.multiple
        ? options
            .filter((option) =>
              selectedOption.find((el) => option.value === el.value)
            )
            .map((el) => el.label)
        : isValidDropdownValue(selectedOption)
        ? options.find((option) => option.value === selectedOption.value)?.label
        : null;
    } else {
      return rest.multiple ? [] : null;
    }
  };
  let selectedValue = getValue();
  return (
    <FormControl fullWidth {...containerProps}>
      {rest.label && <InputLabel id={rest.id || id}>{rest.label}</InputLabel>}
      <Select
        id={id}
        {...rest}
        name={name}
        value={isValidDropdownValue(selectedValue) ? selectedValue : ""}
        onChange={onChange}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return rest.placeholder;
          } else return rest.multiple ? selected.join(", ") : selected;
        }}
      >
        {rest.placeholder && (
          <MenuItem disabled value="">
            <em>{rest.placeholder}</em>
          </MenuItem>
        )}
        {options.map((el, index) => (
          <MenuItem key={index} value={el.value}>
            {rest.multiple ? (
              <>
                <Checkbox
                  checked={
                    selectedValue
                      ? selectedValue.find((ele) => ele === el.value)
                      : false
                  }
                />
                <ListItemText primary={el.label} />
              </>
            ) : (
              el.label
            )}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText error={rest.error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

// yup validation examples
// yup
//   .array()
//   .min(3, "Pick at least 3 tags")
//   .nullable()
//   .required("This is required")
//   .of(
//     yup.object().shape({
//       label: yup.string().required(),
//       value: yup.string().required(),
//     })
//   )

// yup
//   .object()
//   .nullable()
//   .required("This field is required")
//   .shape({
//     label: yup.string().required("Required"),
//     value: yup.string().required("Required"),
//   })

// for more info
// https://stackoverflow.com/questions/54938382/how-do-the-yup-validation-for-react-select
