import {
  AuthPageContent,
  SignupPageContent,
  SocialAuthContent,
} from "src/content/auth";
import { authConfig } from "src/config";
import { Guest, Public } from "src/guard";
import { AuthLayout } from "src/layouts";
import { ROUTES_DEFINITION } from "../router";
import { Helmet } from "react-helmet";

export const authRoutes: ROUTES_DEFINITION = [
  {
    path: authConfig.authPage,
    element: (
      <>
        <Helmet>
          <title>Auth</title>
        </Helmet>
        <Guest>
          <AuthLayout>
            <AuthPageContent />
          </AuthLayout>
        </Guest>
      </>
    ),
  },
  {
    path: authConfig.signupPage,
    element: (
      <>
        <Helmet>
          <title>Sign up - Auth</title>
        </Helmet>
        <Guest>
          <AuthLayout>
            <SignupPageContent />
          </AuthLayout>
        </Guest>
      </>
    ),
  },
  {
    path: authConfig.oauthPage,
    element: (
      <>
        <Helmet>
          <title>OAuth - LiveCord</title>
        </Helmet>
        <Public>
          <AuthLayout>
            <SocialAuthContent />
          </AuthLayout>
        </Public>
      </>
    ),
  },
];
