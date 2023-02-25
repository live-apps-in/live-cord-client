import { accessValueByDotNotation } from "./object-utils";
import { isValidValue } from "./string-utils";

export function globalSearch(array, text) {
  let objects = array || [];
  function trimString(s) {
    var l = 0,
      r = s.length - 1;
    while (l < s.length && s[l] === " ") l++;
    while (r > l && s[r] === " ") r -= 1;
    return s.substring(l, r + 1);
  }

  function compareObjects(o1, o2) {
    var k = "";
    for (k in o1) if (o1[k] !== o2[k]) return false;
    for (k in o2) if (o1[k] !== o2[k]) return false;
    return true;
  }

  function itemExists(haystack, needle) {
    for (var i = 0; i < haystack.length; i++)
      if (compareObjects(haystack[i], needle)) return true;
    return false;
  }

  function searchFor(toSearch) {
    var results = [];
    toSearch = trimString(toSearch); // trim it
    for (var i = 0; i < objects.length; i++) {
      for (var key in objects[i]) {
        let objectValue = objects[i][key] ? objects[i][key].toString() : "";
        objectValue = objectValue.toLowerCase();
        if (objectValue.indexOf(toSearch) !== -1) {
          if (!itemExists(results, objects[i])) results.push(objects[i]);
        }
      }
    }
    return results;
  }
  return searchFor(text?.toLowerCase() || "");
}

export const removeDuplicatesInArrayOfStrings = (arr) =>
  arr.filter(function (item, index, inputArray) {
    return inputArray.indexOf(item) === index;
  });

export const createArray = ({ start = 0, end = 0 }) => {
  var list = [];
  for (var i = start; i <= end; i++) {
    list.push(i);
  }
  return list;
};

export const insertAt = ({ array, index, value }) => {
  let updatedArray = [...array];
  updatedArray.splice(index, 0, value);
  return updatedArray.filter((el) => el !== undefined);
};

export const removeAt = ({ array, index }) => {
  let updatedArray = [...array];
  updatedArray.splice(index, 1);
  return updatedArray.filter((el) => el !== undefined);
};

// https://dev.to/jalal246/moving-element-in-an-array-from-index-to-another-464b#:~:text=1%2D%20Moving%20one%20element%20form,in%20multiple%20arrays%20using%3A%20moveMultiArr%20. --reference
export function move({ array, from, to }) {
  let updatedArray = [...array];
  let numberOfDeletedElm = 1;
  const elm = updatedArray.splice(from, numberOfDeletedElm)[0];
  numberOfDeletedElm = 0;
  updatedArray.splice(to, numberOfDeletedElm, elm);
  return updatedArray;
}

export const getArray = (count) => {
  let array = [];
  for (let i = 0; i < count; i++) array.push(i);
  return array;
};

export const getCustomArray = (array, { index = 0, count = 5 }) => {
  let newArray = [];
  for (let i = index; i < index + count; i++) newArray.push(array[i]);
  return newArray.filter((el) => el !== undefined);
};

export const removeDuplicates = (
  array,
  {
    detectExactDuplicate = true,
    keys = [], // keys to use while detecting duplicates
  } = {}
) => {
  if (array) {
    let result = [];
    if (array[0]) {
      if (typeof array[0] === "object") {
        result = array.reduce((unique, o) => {
          // if detectExactDuplicate is true
          if (detectExactDuplicate) {
            let keysForExactDuplicationCheck =
              keys.length === 0 ? Object.keys(o) : [...keys];
            // check for all keys(from keysForExactDuplicationCheck array) in the object whether it is exactly same
            if (
              !unique.some((obj) =>
                keysForExactDuplicationCheck.every(
                  (individualKey) =>
                    accessValueByDotNotation(obj, individualKey) ===
                    accessValueByDotNotation(o, individualKey)
                )
              )
            ) {
              unique.push(o);
            }
          } else {
            // here even if a single key got duplicates the object will not be added to the unique array
            if (
              !unique.some((obj) =>
                keys.some(
                  (individualKey) =>
                    accessValueByDotNotation(obj, individualKey) ===
                    accessValueByDotNotation(o, individualKey)
                )
              )
            ) {
              unique.push(o);
            }
          }
          return unique;
        }, []);
      } else if (typeof array[0] === "string" || typeof array[0] === "number") {
        result = array.filter(function (item, index, inputArray) {
          return inputArray.indexOf(item) === index;
        });
      } else result = [];
      return result;
    } else return array;
  }
  return array;
};

// https://stackoverflow.com/questions/53212020/get-list-of-duplicate-objects-in-an-array-of-objects -- reference
export const getDuplicates = (
  array,
  {
    detectExactDuplicate = true,
    keys = [], // keys to use while detecting duplicates
  } = {}
) => {
  let result = [];
  let duplicationDetails = [];
  if (array) {
    if (array[0]) {
      if (typeof array[0] === "object") {
        let keysForExactDuplicationCheck =
          keys.length === 0 ? Object.keys(array[0]) : [...keys];
        let lookup = array.reduce((a, e, currentIndex) => {
          if (detectExactDuplicate) {
            keysForExactDuplicationCheck.forEach((key) => {
              a[e[key]] = ++a[e[key]] || 0;
              if (a[e[key]] > 0)
                duplicationDetails.push({
                  key,
                  index: currentIndex,
                  occurrence: a[e[key]],
                  value: e[key],
                });
            });
            return a;
          } else {
            keys.forEach((key) => {
              a[e[key]] = ++a[e[key]] || 0;
              if (a[e[key]] > 0)
                duplicationDetails.push({
                  key,
                  index: currentIndex,
                  occurrence: a[e[key]],
                  value: e[key],
                });
            });
            return a;
          }
        }, {});
        result = array.filter((e) =>
          detectExactDuplicate
            ? keysForExactDuplicationCheck.every((key) => lookup[e[key]])
            : keys.some((key) => lookup[e[key]])
        );
      }
      // do it later
      // else if (typeof array[0] === "string" || typeof array[0] === "number") {
      //   result = array.filter(function (item, index, inputArray) {
      //     return inputArray.indexOf(item) === index;
      //   });
      // }
      else result = [];
      return { duplicatedElements: result, duplicationDetails };
    } else return { duplicatedElements: result, duplicationDetails };
  }
  return { duplicatedElements: result, duplicationDetails };
};

export const validateArrayOfObjects = (
  data,
  {
    requiredFieldKeys = [],
    removeDuplicates: removeDuplicatesBoolean = false,
    detectDuplicates = true,
    duplicationOptions: { keys = [], detectExactDuplicate = true } = {},
    validationTypes = null, // specify the field types as value and the key to access the value from each object as key eg: { employeeEmail: 'email', mobileNumber: 'number', name: 'text' }.
    // specify null if you don't need single field validation
    // replaceEmptyFieldWith = "",
  } = {}
) =>
  new Promise((resolve, reject) => {
    let finalData = [...data];

    // first check for duplicates
    if (detectDuplicates) {
      if (removeDuplicatesBoolean) {
        finalData = removeDuplicates(finalData, { keys, detectExactDuplicate });
      } else {
        const duplicates = getDuplicates(finalData, {
          keys,
          detectExactDuplicate,
        });
        if (duplicates.duplicatedElements.length > 0)
          reject({
            type: "duplicate",
            data: duplicates,
          });
      }
    }
    if (requiredFieldKeys && requiredFieldKeys.length > 0) {
      let requiredFieldError = [];
      finalData.forEach((el, index) => {
        requiredFieldKeys.forEach((key) => {
          if (!el[key]?.toString()?.trim()) {
            requiredFieldError.push({ key, index, value: el[key] });
          }
        });
      });
      if (requiredFieldError.length > 0) {
        reject({
          type: "required",
          data: requiredFieldError,
        });
      }
    }
    if (validationTypes) {
      let validationTypeError = [];
      finalData.forEach((el, index) => {
        Object.keys(el).forEach((key) => {
          if (validationTypes[key]) {
            if (
              !isValidValue({
                value: el[key],
                type: validationTypes[key],
                isRequired: requiredFieldKeys.find(
                  (requiredKey) => requiredKey === key
                ),
              })
            )
              validationTypeError.push({ key, index, value: el[key] });
          }
        });
      });
      if (validationTypeError.length > 0) {
        reject({
          type: "validation",
          data: validationTypeError,
        });
      }
    }
    resolve(finalData);
  });
