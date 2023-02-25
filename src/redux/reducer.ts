import { combineReducers } from "@reduxjs/toolkit";
import { authReducer, themeReducer } from "./slices";

export const reducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
});
