import { GUILDS, GUILD_DETAILS } from "src/model";
import { gateway } from "./gateway";

class GuildApi {
  fetchGuilds(): Promise<GUILDS> {
    return gateway.get("/kitty_chan/guild");
  }
  fetchGuildProfile(_id: GUILD_DETAILS["_id"]): Promise<GUILD_DETAILS> {
    return gateway.get(`/kitty_chan/guild/${_id}/profile`);
  }
}

export const guildApi = new GuildApi();
