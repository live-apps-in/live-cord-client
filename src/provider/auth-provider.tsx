import { useEffect } from "react";
import { AppLoader } from "src/components";
import { useAuth } from "src/hooks";
import { getError } from "src/utils";

export const AuthProvider = (props) => {
  const { isInitialized, initialize } = useAuth();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initialize();
        window.flash({ message: "Authentication successfull" });
      } catch (err) {
        window.flash({ message: getError(err).message, variant: "error" });
      }
    };
    initializeApp();
  }, []);

  return <>{isInitialized ? props.children : <AppLoader />}</>;
};
