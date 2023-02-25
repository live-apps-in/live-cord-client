import { authConfig } from "src/config";
import { useAuth } from "src/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Guest = (props) => {
  const [verified, setVerified] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate(authConfig.homePage, { replace: true });
    else setVerified(true);
  }, []);

  if (!verified) return null;

  return <>{props.children}</>;
};
