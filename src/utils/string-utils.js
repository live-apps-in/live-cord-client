import pluralize from "pluralize";
import validator from "validator";
// import convertToHumanReaadableForm from "millify";
// import { MillifyOptions } from "millify/dist/options";

// export function millify(number, options) {
//   if (!number) number = 0;
//   return convertToHumanReaadableForm(number, { space: true, ...options }) || 0;
// }

export function millify(value, { units, space = true } = {}) {
  var newValue = !value ? 0 : value;
  if (value >= 1000) {
    var suffixes = units || ["", "K", "M", "B", "T", "P", "E"];
    var suffixNum = Math.floor(("" + value).length / 3);
    var shortValue = "";
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum !== 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision)
      );
      var dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue % 1 !== 0) shortValue = shortValue.toFixed(1);
    newValue =
      shortValue +
      (space ? " " : "") +
      (suffixes[suffixNum] || suffixes[suffixes.length - 1]);
  }
  return newValue;
}

export function plurify({ number = 0, string }) {
  number = number || 0;
  string = string || null;
  if (string) {
    return pluralize.plural(string, number);
  }
  return "";
}

// https://github.com/validatorjs/validator.js/blob/master/src/index.js -- other available util functions
export function isValidValue({ value = null, type = "", isRequired = false }) {
  if (value !== null && value !== undefined) {
    // convert value to string (recommended by the 'validator' library)
    value = value + "";
    type = type || "";
    if (type) {
      if (type === "email") {
        return validator.isEmail(value);
      }
      if (type === "text") {
        return validator.isAlphanumeric(value);
      }
      if (type === "number") {
        return validator.isNumeric(value);
      }
      return false;
    }
    return false;
  }
  return !isRequired;
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
