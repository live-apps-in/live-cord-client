import { useParams } from "react-router-dom";
import { guildApi } from "src/api";
import { CustomButton, CustomCard } from "src/components";
import { useQueryState } from "src/hooks";
import { handleError } from "src/utils";

export const GuildViewContent: React.FC<any> = () => {
  const { id } = useParams();

  const [guildDetails, loading] = useQueryState({
    queryFn: () => guildApi.fetchGuildProfile(id),
    queryKey: `guild.${id}`,
    onError: handleError,
  });

  console.log(guildDetails);

  return (
    <CustomCard loading={loading}>
      Guild View
      <CustomButton href={`/member/guild/${id}/config`}>
        Configure Guild
      </CustomButton>
    </CustomCard>
  );
};
