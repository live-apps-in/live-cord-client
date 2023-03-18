import { GUILDS, GUILD_DETAILS } from "src/model";
import { createApiFunction } from "src/utils";
import { gateway } from "./gateway";

class GuildApi {
  fetchGuilds(): Promise<GUILDS> {
    return createApiFunction(() => gateway.get("/kitty_chan/guild"));
  }
  fetchGuildProfile(_id: GUILD_DETAILS["_id"]): Promise<GUILD_DETAILS> {
    return createApiFunction(() =>
      gateway.get(`/kitty_chan/guild/${_id}/profile`)
    );
  }
}

export const guildApi = new GuildApi();
