export type BREAKPOINT = "xs" | "sm" | "md" | "lg" | "xl";
export enum BREAKPOINTS {
  xs = 320,
  sm = 600,
  md = 960,
  lg = 1280,
  xl = 1840,
}

class MediaQuery {
  up(breakpoint: BREAKPOINT | number): string {
    return `@media(min-width: ${BREAKPOINTS[breakpoint] || breakpoint}px)`;
  }
  down(breakpoint: BREAKPOINT | number): string {
    return `@media(max-width: ${BREAKPOINTS[breakpoint] || breakpoint}px)`;
  }
}

export const mediaQuery = new MediaQuery();
