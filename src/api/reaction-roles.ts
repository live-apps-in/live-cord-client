import { REACTION_ROLES } from "src/model";
import { createApiFunction } from "src/utils";
import { gateway } from "./gateway";

class ReactionRolesApi {
  fetchReactionRoles(guildId: string): Promise<REACTION_ROLES> {
    return createApiFunction(() =>
      gateway.get(`/kitty_chan/guild/${guildId}/reaction_roles`)
    );
  }
}

export const reactionRolesApi = new ReactionRolesApi();
