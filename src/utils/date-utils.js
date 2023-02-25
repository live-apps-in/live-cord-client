import { isSameSecond, isAfter, isBefore } from "date-fns";

export const getTimeCollapsed = (timestamp) => {
  if (
    timestamp !== null &&
    timestamp !== undefined &&
    timestamp?.toString().length !== 0
  ) {
    const date = new Date(timestamp);
    return formatAMPM(date);
  }
  return "";
};

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

export const getDateCollapsed = (timestamp) => {
  if (!timestamp) return "";
  let date = new Date(timestamp);
  return (
    (date.getDate().toString().length === 1
      ? "0" + date.getDate().toString()
      : date.getDate().toString()) +
    "-" +
    ((date.getMonth() + 1).toString().length === 1
      ? "0" + (date.getMonth() + 1).toString()
      : (date.getMonth() + 1).toString()) +
    "-" +
    date.getFullYear().toString()
  );
};

export const calculateDate = (timestamp, days, month, year) => {
  let Days = days || 0;
  let Months = month || 0;
  let Years = year || 0;
  let date = new Date(timestamp);
  date.setDate(date.getDate() + parseInt(Days));
  date.setMonth(date.getMonth() + parseInt(Months));
  date.setFullYear(date.getFullYear() + parseInt(Years));
  return date;
};

export const noOfDaysBetween = (start = Date.now(), end = Date.now()) => {
  start = new Date(start);
  end = new Date(end);
  let Difference_In_Time = end.getTime() - start.getTime();
  let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  Difference_In_Days = Difference_In_Days.toFixed();
  if (Difference_In_Days < 0) {
    Difference_In_Days = 0;
  }
  return parseInt(Difference_In_Days);
};

export const getStartOfDay = (timestamp = null) => {
  if (!timestamp) return null;
  let date = new Date(timestamp);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};
export const getEndOfDay = (timestamp = null) => {
  if (!timestamp) return null;
  let date = new Date(timestamp);
  date.setHours(23, 59, 59, 999);
  return date.getTime();
};

export const getMonthName = (monthIndex) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthIndex];
};
export const getShortMonthName = (monthIndex) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNames[monthIndex];
};

export const getWeekNumber = (date = new Date()) => {
  date = new Date(date);
  var oneJan = new Date(date.getFullYear(), 0, 1);
  var numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
  var result = Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
  return result;
};

export const isDateBefore = ({ date, maxDate }) => {
  if (date && maxDate) {
    date = getStartOfDay(new Date(date));
    maxDate = getEndOfDay(new Date(maxDate));
    return date <= maxDate;
  }
  return true;
};
export const isDateAfter = ({ date, minDate }) => {
  if (date && minDate) {
    date = getEndOfDay(new Date(date));
    minDate = getStartOfDay(new Date(minDate));
    return date >= minDate;
  }
  return true;
};

export const getValidDate = (d) => {
  if (Object.prototype.toString.call(d) === "[object Date]") {
    if (isNaN(d.getTime())) {
      // d.valueOf() could also work
      // date is not valid
      return null;
    } else {
      // date is valid
      return d;
    }
  } else {
    // not a date
    return null;
  }
};

export const sameOrBefore = (d1 = new Date(), d2 = new Date()) => {
  return isSameSecond(d1, d2) ? true : isBefore(d1, d2) ? true : false;
};

export const sameOrAfter = (d1 = new Date(), d2 = new Date()) => {
  return isSameSecond(d1, d2) ? true : isAfter(d1, d2) ? true : false;
};

export const isBetweenDate = ([r1a, r1b] = [], r2b, equalCounts = true) => {
  if (r1b && r2b) {
    return equalCounts
      ? sameOrBefore(r2b, r1a) && sameOrAfter(r2b, r1b)
      : isBefore(r2b, r1a) && isAfter(r2b, r1b);
  }
  return false;
};
