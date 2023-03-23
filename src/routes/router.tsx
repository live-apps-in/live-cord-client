import { useRoutes, RouteProps } from "react-router-dom";
import { routes } from "src/routes";

export interface ROUTE_DEFINITION extends Omit<RouteProps, "children"> {
  path: string;
  children?: ROUTE_DEFINITION[];
}
export interface NAVIGATION_LINK {
  name: string;
  path: string;
  icon?: any;
  children?: NAVIGATION_LINKS;
}

export type ROUTES_DEFINITION = ROUTE_DEFINITION[];
export type NAVIGATION_LINKS = NAVIGATION_LINK[];

export type NAVIGATION_PROPS = {
  heading?: string;
  content?: NAVIGATION_LINKS;
}[];

export const Routes: React.FC = () => {
  const content = useRoutes(routes);
  return content;
};
