import { NAVIGATION_PROPS } from "../router";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";

export const memberLayoutNavigationProps: NAVIGATION_PROPS = [
  {
    heading: "Home",
    content: [
      {
        name: "Dashboard",
        path: "/member",
        icon: <DashboardIcon />,
      },
    ],
  },
  {
    heading: "Roles",
    content: [
      {
        name: "Reaction Roles",
        path: "/member/reaction_roles",
        icon: <PeopleIcon />,
      },
    ],
  },
];
