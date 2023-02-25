import { rbacConfig } from "src/config";
import { ROUTES_DEFINITION } from "../router";
import { Helmet } from "react-helmet";
import { Authenticated } from "src/guard";
import { MemberHomeContent } from "src/content/member";
import { MemberLayout } from "src/layouts";

export const memberRoutes: ROUTES_DEFINITION = [
  {
    path: rbacConfig.homePage.member,
    element: (
      <>
        <Helmet>
          <title>Ping</title>
        </Helmet>
        <Authenticated roles={["member"]}>
          <MemberLayout>
            <MemberHomeContent />
          </MemberLayout>
        </Authenticated>
      </>
    ),
  },
];
