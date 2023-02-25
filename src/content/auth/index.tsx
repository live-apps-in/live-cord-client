import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authConfig } from "src/config";

export const AuthPageContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(authConfig.signupPage);
  }, []);

  return null;
};

export * from "./signup";
export * from "./login";
export * from "./o-auth";
