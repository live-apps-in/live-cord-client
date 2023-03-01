import { useParams } from "react-router-dom";
import { CustomButton } from "src/components";

export const GuildViewContent: React.FC<any> = () => {
  const { id } = useParams();
  return (
    <div>
      Guild View
      <CustomButton href={`/member/guild/${id}/config`}>
        Configure Guild
      </CustomButton>
    </div>
  );
};
