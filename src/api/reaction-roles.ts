import {
  ADD_REACTION_ROLE,
  REACTION_ROLES,
  REACTION_ROLE_DETAILS,
} from "src/model";
import { createApiFunction } from "src/utils";
import { gateway } from "./gateway";

class ReactionRolesApi {
  fetchReactionRoles(guildId: string): Promise<REACTION_ROLES> {
    return createApiFunction(() =>
      gateway.get(`/kitty_chan/guild/${guildId}/reaction_roles`)
    );
  }
  fetchSingleReactionRole(guildId: string, reactionRoleId: string) {
    return createApiFunction(() =>
      gateway.get(
        `/kitty_chan/guild/${guildId}/reaction_roles/${reactionRoleId}`
      )
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
  editReactionRole(
    details: Partial<REACTION_ROLE_DETAILS> & { guildId: string }
  ): Promise<void> {
    return createApiFunction(() =>
      gateway.patch(
        `/kitty_chan/guild/${details.guildId}/reaction_roles`,
        details
      )
    );
  }
  deleteReactionRole(guildId: string, reactionRoleId: string): Promise<void> {
    return createApiFunction(() =>
      gateway.delete(
        `/kitty_chan/guild/${guildId}/reaction_roles/${reactionRoleId}`
      )
    );
  }
}

export const reactionRolesApi = new ReactionRolesApi();
