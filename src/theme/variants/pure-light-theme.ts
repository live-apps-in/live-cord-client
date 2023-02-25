import { createTheme, alpha } from "@mui/material";
import "@mui/lab/themeAugmentation";
import { mediaQuery } from "../viewport";

// import i18n from 'src/i18n/i18n';

const themeColors = {
  primary: "#5569ff",
  secondary: "#6E759F",
  success: "#3DAB54",
  warning: "#FFA319",
  error: "#FF1943",
  info: "#33C2FF",
  default: "#353535",
  black: "#223354",
  white: "#ffffff",
  link: "#3392ff",
};

export const PureLightTheme = createTheme({
  colors: themeColors,
  general: {
    bodyBg: "#FFFFFF",
    fontFamily: "'Montserrat', sans-serif",
  },
  sidebar: {
    background: themeColors.white,
    boxShadow: "0 0 5px 0 lightgrey",
  },
  header: {
    background: "#F6F8FA",
    boxShadow: "none",
    textColor: "black",
    height: "88.5px",
  },
  componentCustomStyles: {
    // typography
    h1: {
      fontWeight: 700,
      fontSize: "35px",
      margin: "4px 2px",
      lineHeight: "40px",
      [`${mediaQuery.up("sm")}`]: {
        margin: "5px 3px",
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: "30px",
      margin: "4px 2px",
      lineHeight: "38px",
      [`${mediaQuery.up("sm")}`]: {
        margin: "5px 3px",
      },
    },
    h3: {
      fontWeight: 500,
      fontSize: "25px",
      lineHeight: 1,
      color: themeColors.black,
      margin: "3px 2px",
      [`${mediaQuery.up("sm")}`]: {
        margin: "4px 3px",
      },
    },
    h4: {
      fontWeight: 500,
      fontSize: "20px",
      margin: "3px 2px",
      [`${mediaQuery.up("sm")}`]: {
        margin: "4px 3px",
      },
    },
    h5: {
      fontWeight: 500,
      fontSize: "17px",
      margin: "3px 2px",
      [`${mediaQuery.up("sm")}`]: {
        margin: "4px 3px",
      },
    },
    h6: {
      fontSize: "15px",
      fontWeight: 500,
      margin: "3px 2px",
      [`${mediaQuery.up("sm")}`]: {
        margin: "4px 3px",
      },
    },
    p: {
      fontWeight: 500,
      fontSize: "14px",
      margin: "3px 2px",
      [`${mediaQuery.up("sm")}`]: {
        margin: "4px 3px",
      },
    },
    pre: {
      fontWeight: 300,
      fontSize: "15px",
      color: themeColors.black,
    },
    span: {
      fontSize: "14px",
      color: themeColors.black,
    },
    link: {
      textDecoration: "none",
    },
    label: {
      fontFamily: "Gilroy",
      fontWeight: 500,
      margin: "5px 0",
    },
    subtitle1: {
      fontSize: 14,
      color: alpha(themeColors.black, 0.7),
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: 15,
      color: alpha(themeColors.black, 0.7),
    },
    body1: {
      fontSize: 14,
    },
    body2: {
      fontSize: 14,
    },
    caption: {
      fontSize: 13,
      textTransform: "uppercase",
      color: alpha(themeColors.black, 0.5),
    },
    button: {
      fontWeight: 600,
    },
    overline: {
      fontSize: 13,
      fontWeight: 700,
      textTransform: "uppercase",
    },

    // other components
    Card: {},
  },
});
