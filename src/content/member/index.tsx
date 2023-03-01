import { styled } from "@mui/material";
import { guildApi } from "src/api/guild";
import { useQueryState } from "src/hooks";
import { mediaQuery } from "src/theme";
import { handleError } from "src/utils";
import { GuildCard } from "./components";

const MemberContentHome = styled("div")`
  padding: 5px;
  ${mediaQuery.up("sm")} {
    padding: 20px;
  }
`;

export const MemberHomeContent = () => {
  const [
    guilds = [
      {
        name: "Gamers Hub",
        image: null,
        description:
          "test test test test test test test test test test test test test ",
        _id: "test",
      },
    ],
    loading,
  ] = useQueryState({
    queryKey: "guild",
    queryFn: guildApi.fetchGuilds,
    onError: handleError,
  });

  console.log(guilds);

  return (
    <MemberContentHome>
      {guilds.map((el, index) => (
        <GuildCard {...el} key={index} />
      ))}
    </MemberContentHome>
  );
};

export * from "./guild";
