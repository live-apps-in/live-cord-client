import { CustomButton } from "src/components";
import { useAuth } from "src/hooks";

export const AdminHomeContent: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div>
      Admin Home
      <CustomButton onClick={() => logout()}>Logout</CustomButton>
    </div>
  );
};
