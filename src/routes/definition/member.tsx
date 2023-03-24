import { rbacConfig } from "src/config";
import { ROUTES_DEFINITION } from "../router";
import { Helmet } from "react-helmet";
import { Authenticated } from "src/guard";
import {
  GuildConfigContent,
  GuildViewContent,
  MemberHomeContent,
  ReactionRoleConfigurationPageContent,
  ReactionRolesContent,
} from "src/content/member";
import { MemberLayout } from "src/layouts";

export const memberRoutes: ROUTES_DEFINITION = [
  {
    path: rbacConfig.homePage.member,
    element: (
      <>
        <Helmet>
          <title>Live Cord - Servers</title>
        </Helmet>
        <Authenticated roles={["member"]}>
          <MemberLayout>
            <MemberHomeContent />
          </MemberLayout>
        </Authenticated>
      </>
    ),
  },
  {
    path: "/member/guild/:id",
    element: (
      <>
        <Helmet>
          <title>Live Cord - Guild</title>
        </Helmet>
        <Authenticated roles={["member"]}>
          <MemberLayout>
            <GuildViewContent />
          </MemberLayout>
        </Authenticated>
      </>
    ),
  },
  {
    path: "/member/guild/:id/config",
    element: (
      <>
        <Helmet>
          <title>Live Cord - Guild</title>
        </Helmet>
        <Authenticated roles={["member"]}>
          <MemberLayout>
            <GuildConfigContent />
          </MemberLayout>
        </Authenticated>
      </>
    ),
  },
  {
    path: "/member/reaction_roles",
    element: (
      <>
        <Helmet>
          <title>Reaction Roles</title>
        </Helmet>
        <Authenticated roles={["member"]}>
          <MemberLayout>
            <ReactionRolesContent />
          </MemberLayout>
        </Authenticated>
      </>
    ),
  },
  {
    path: "/member/reaction_roles/:id",
    element: (
      <>
        <Helmet>
          <title>Reaction Roles</title>
        </Helmet>
        <Authenticated roles={["member"]}>
          <MemberLayout>
            <ReactionRoleConfigurationPageContent />
          </MemberLayout>
        </Authenticated>
      </>
    ),
  },
];
