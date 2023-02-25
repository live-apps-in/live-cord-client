import * as CSS from "csstype";
import { projectConfig } from "src/config";
import * as CustomThemes from "./variants";

export enum THEME_NAMES {
  PureLightTheme = "pure-light-theme",
}

const customThemes = {
  [THEME_NAMES.PureLightTheme]: CustomThemes.PureLightTheme,
};

export type THEME = keyof typeof customThemes;

export function themeCreator(theme: keyof typeof customThemes) {
  return customThemes[theme] || customThemes[projectConfig.defaultTheme];
}

export const getTheme = () => {
  try {
    return (
      (window.localStorage.getItem("theme") as THEME) ||
      // THEME_NAMES.PureLightTheme
      ("pure-light-theme" as THEME_NAMES)
    );
  } catch {
    // return THEME_NAMES.PureLightTheme;
    return "pure-light-theme" as THEME_NAMES;
  }
};

// styled components CSS type
export type CSSProperties = CSS.Properties<string | number>;

export type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject };

export interface CSSObject extends CSSProperties, CSSPseudos {
  [key: string]: CSSObject | string | number | undefined;
}

export type STYLES = CSSObject;

export type THEME_COLORS = {
  primary: STYLES["color"];
  secondary: STYLES["color"];
  success: STYLES["color"];
  warning: STYLES["color"];
  error: STYLES["color"];
  info: STYLES["color"];
  black: STYLES["color"];
  white: STYLES["color"];
  link: STYLES["color"];
  default: STYLES["color"];
};

declare module "@mui/material/styles" {
  interface Theme {
    colors: THEME_COLORS;
    general: {
      bodyBg: STYLES["color"];
      fontFamily?: STYLES["fontFamily"];
    };
    header: {
      height: string;
      background: STYLES["color"];
      boxShadow: STYLES["color"];
      textColor: STYLES["color"];
    };
    sidebar: {
      background: STYLES["color"];
      boxShadow: string;
    };
    componentCustomStyles: {
      h1: STYLES;
      h2: STYLES;
      h3: STYLES;
      h4: STYLES;
      h5: STYLES;
      h6: STYLES;
      p: STYLES;
      pre: STYLES;
      span: STYLES;
      link: STYLES;
      label: STYLES;
      [ComponentName: string]: STYLES;
    };
  }

  interface ThemeOptions {
    colors: THEME_COLORS;
    general: {
      bodyBg: STYLES["color"];
      fontFamily?: STYLES["fontFamily"];
    };
    header: {
      height: string;
      background: STYLES["color"];
      boxShadow: STYLES["color"];
      textColor: STYLES["color"];
    };
    sidebar: {
      background: STYLES["color"];
      boxShadow: string;
    };
    componentCustomStyles: {
      h1: STYLES;
      h2: STYLES;
      h3: STYLES;
      h4: STYLES;
      h5: STYLES;
      h6: STYLES;
      p: STYLES;
      pre: STYLES;
      span: STYLES;
      link: STYLES;
      label: STYLES;
      subtitle1: STYLES;
      subtitle2: STYLES;
      body1: STYLES;
      body2: STYLES;
      caption: STYLES;
      button: STYLES;
      overline: STYLES;
      Card: STYLES;
      [ComponentName: string]: STYLES;
    };
  }
}
