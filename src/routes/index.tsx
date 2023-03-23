import { PageNotFound } from "src/components";
import { routeDefinition } from "./definition";
import { navigationProps } from "./navigation-links";
import { Helmet } from "react-helmet";
import { Authenticated } from "src/guard";
import { HomePageContent } from "src/content";
import { projectConfig } from "src/config";
import { ROUTE_DEFINITION } from "./router";

export const routes: ROUTE_DEFINITION[] = [
  {
    path: "/",
    element: (
      <>
        <Helmet>
          <title>{projectConfig.title}</title>
        </Helmet>
        <Authenticated>
          <HomePageContent />
        </Authenticated>
      </>
    ),
  },
  ...routeDefinition.auth,
  ...routeDefinition.admin,
  ...routeDefinition.member,
  ...routeDefinition.public,
  // the below examples works as well
  // {
  //   path: "/",
  //   children: [...routeDefinition.auth],
  // },
  // {
  //   path: "/",
  //   children: [...routeDefinition.admin],
  // },
  // {
  //   path: "/member",
  //   children: [...routeDefinition.member]
  // },
  // for other roles/categories use the below routing format
  // {
  //   path: "/other",
  //   children: [{ path: "/other", element: <div>Other</div> }],
  // },
  {
    path: "/404",
    element: (
      <>
        <Helmet>
          <title>Page not found</title>
        </Helmet>
        <PageNotFound />
      </>
    ),
  },
  {
    path: "*",
    element: (
      <>
        <Helmet>
          <title>Page not found</title>
        </Helmet>
        <PageNotFound />
      </>
    ),
  },
];

export { navigationProps, routeDefinition };

export * from "./router";
