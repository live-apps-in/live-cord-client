// yup
import * as yup from "yup";
import { AnyObject, Maybe } from "yup/lib/types";
import "yup-phone";
// uniqid
import uniqId from "uniqid";
// react-phone-number-input
import { isValidPhoneNumber } from "react-phone-number-input";

// other
import { projectConfig } from "src/config";

// yup
// https://github.com/jquense/yup/issues/312#issuecomment-745034006 --reference
declare module "yup" {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    // declare all custom methods here
    password(message?: string): StringSchema<TType, TContext>;
    confirmPassword(
      reference: string,
      message?: string
    ): StringSchema<TType, TContext>;
    onlyAlphabets(message?: string): StringSchema<TType, TContext>;
    alphaNumeric(message?: string): StringSchema<TType, TContext>;
  }

  interface NumberSchema<
    TType extends Maybe<number> = number | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    length(length: number, message?: string);
    minLength(
      minLength: number,
      message?: string
    ): NumberSchema<TType, TContext>;
    maxLength(
      maxLength: number,
      message?: string
    ): NumberSchema<TType, TContext>;
  }
}

// const phoneRegex =
//   /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

yup.addMethod(yup.string, "phone", function () {
  return this.test("phone", "Invalid Phone Number", (value: any) =>
    (value === 0 ? "0" : value)?.toString()
      ? isValidPhoneNumber(
          value.toString(),
          projectConfig.defaultPhonenumberCountry
        )
      : true
  );
});

yup.addMethod(
  yup.string,
  "password",
  function (
    errorMessage = "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
  ) {
    return this.test(
      "password",
      errorMessage,
      (value: any) => passwordRegex.test(value)
      // () => true
    );
  }
);

yup.addMethod(
  yup.string,
  "confirmPassword",
  function (reference, errorMessage = "Password doesn't match") {
    return yup.string().test("confirmPassword", errorMessage, function (value) {
      return this.parent[reference] === value;
    });
  }
);

yup.addMethod(
  yup.string,
  "onlyAlphabets",
  function (errorMessage = "Only alphabets allowed") {
    return yup.string().matches(/^[aA-zZ\s]+$/, errorMessage);
  }
);

yup.addMethod(
  yup.number,
  "maxLength",
  function (maxLength, errorMessage = "Exceeds max length") {
    return yup
      .number()
      .test(
        "len",
        errorMessage,
        (val) =>
          (val === 0 ? val.toString() : val)?.toString().length <= maxLength
      );
  }
);

yup.addMethod(
  yup.string,
  "alphaNumeric",
  function (errorMessage = "Only alphabets and numbers are allowed") {
    return yup.string().matches(/^[aA-zZ0-9\s]+$/i, errorMessage);
  }
);

yup.addMethod(yup.number, "length", function (length, errorMessage) {
  return yup
    .number()
    .test(
      "len",
      errorMessage || `Should be exactly be of ${length} digits`,
      (val) => (val === 0 ? val.toString() : val)?.toString().length === length
    );
});
// -------------------------------------------------------------------------------------- //

export { yup, uniqId };
