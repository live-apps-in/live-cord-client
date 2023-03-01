import { GUILDS } from "src/model";
import { gateway } from "./gateway";

class GuildApi {
  fetchGuilds(): Promise<GUILDS> {
    return gateway.get("/kitty_chan/guild");
  }
}

export const guildApi = new GuildApi();
