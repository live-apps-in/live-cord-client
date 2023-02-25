import { AdminHomeContent } from "src/content/admin";
import { Authenticated } from "src/guard";
import { ROUTES_DEFINITION } from "src/routes";
import { Helmet } from "react-helmet";
import { AdminLayout } from "src/layouts";

export const adminRoutes: ROUTES_DEFINITION = [
  {
    path: "/admin",
    element: (
      <>
        <Helmet>
          <title>Admin</title>
        </Helmet>
        <Authenticated roles={["admin"]}>
          <AdminLayout>
            <AdminHomeContent />
          </AdminLayout>
        </Authenticated>
      </>
    ),
    index: true,
  },
];
