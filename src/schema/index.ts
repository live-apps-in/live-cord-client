// all schemas for forms in this app goes here

import { yup } from "src/utils";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is required"),
});

export const signUpSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  user_name: yup
    .string()
    .alphaNumeric("Only alphabets and numbers")
    .required("Username is required"),
  user_tag: yup
    .string()
    .length(4, "Should be exactly 4 digits")
    .required("Tag is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
});

export const searchUserSchema = yup.object().shape({
  user: yup.string().required("User Name is required"),
});

export const chatSchema = yup.object().shape({
  message: yup.string().required(),
});
