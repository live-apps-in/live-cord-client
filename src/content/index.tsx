// don't export other folders from here, to avoid clash in component names

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppLoader } from "src/components";
import { rbacConfig } from "src/config";
import { useAuth } from "src/hooks";

export const HomePageContent = () => {
  const { data } = useAuth();
  const navigate = useNavigate();
  console.log(data);
  useEffect(() => {
    // when you logged in and you come to the homepage, redirect it to the respective role's homepage
    if (data) {
      navigate(
        `${
          rbacConfig.homePage[data?.role as keyof typeof rbacConfig.homePage]
        }`,
        { replace: true }
      );
    }
  }, []);

  return <AppLoader />;
};
