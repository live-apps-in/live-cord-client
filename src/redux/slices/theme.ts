import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { THEME, THEME_NAMES } from "src/theme";

// TODO: use the getTheme function from src/theme -- resolve the circular dependency error
const getTheme = () => {
  try {
    return (
      (window.localStorage.getItem("theme") as THEME) ||
      // THEME_NAMES.PureLightThemeMinimalSidebar
      ("pure-light-theme" as THEME_NAMES)
    );
  } catch {
    // return THEME_NAMES.PureLightThemeMinimalSidebar;
    return "pure-light-theme" as THEME_NAMES;
  }
};

const initialState: THEME = getTheme();

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme(_state: THEME, action: PayloadAction<THEME>) {
      return action.payload;
    },
  },
});

export const { actions: themeActions, reducer: themeReducer } = themeSlice;
