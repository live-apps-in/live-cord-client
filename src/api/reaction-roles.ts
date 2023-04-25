import { ADD_REACTION_ROLE, REACTION_ROLES } from "src/model";
import { createApiFunction } from "src/utils";
import { gateway } from "./gateway";

class ReactionRolesApi {
  fetchReactionRoles(guildId: string): Promise<REACTION_ROLES> {
    return createApiFunction(() =>
      gateway.get(`/kitty_chan/guild/${guildId}/reaction_roles`)
    );
  }
  addReactionRole(
    details: ADD_REACTION_ROLE & { guildId: string }
  ): Promise<void> {
    return createApiFunction(() =>
      gateway.post(
        `/kitty_chan/guild/${details.guildId}/reaction_roles`,
        details
      )
    );
  }
}

export const reactionRolesApi = new ReactionRolesApi();
