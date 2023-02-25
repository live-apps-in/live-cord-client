export function filterNumbers(string) {
  if (string !== null && string !== undefined) {
    return string.toString().replace(/\D/g, "") !== ""
      ? parseInt(string.toString().replace(/\D/g, ""))
      : "";
  }
  return "";
}

export function numberWithCommas(x) {
  x = x || 0;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function isNumericValue(value) {
  value = value?.trim() || value;
  if(value === undefined || value === null || value === '' || isNaN(value)) {
    return false;
  }
  if(typeof parseInt(value) === 'number') {
    return true;
  }
  return false;
}
