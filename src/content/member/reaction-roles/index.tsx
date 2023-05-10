import { styled } from "@mui/material";
import {
  CustomButton,
  CustomIconButton,
  CustomText,
  EmptyMessage,
  FlexRow,
  JustifyBetween,
  MaterialSelect,
} from "src/components";
import { mediaQuery } from "src/theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useActions, useAuth, useQueryState } from "src/hooks";
import { reactionRolesApi } from "src/api";
import { handleError } from "src/utils";
import { RoleForm } from "./role-form";
import { REACTION_ROLE_DETAILS } from "src/model";
import { discordConfig } from "src/config";

const ReactionRolesContainer = styled("div")`
  padding: 20px;
  width: 100%;
  position: relative;
  ${mediaQuery.up("sm")} {
    width: 90%;
  }
`;

const ReactionRoleCard = styled(JustifyBetween)(
  ({ theme }) => `
  padding: 10px;
  background-color: ${theme.colors.white};
  margin: 20px 0;
  align-items: center;
  border-radius: 20px;
  z-index: 1;
`
);

const ReactionRoleActions = styled(FlexRow)`
  gap: 5px;
  padding: 5px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

const ReactionRolesHeader = styled(JustifyBetween)(
  ({ theme }) => `
  position: sticky;
  top: 0;
  background-color: ${theme.general.bodyBg};
  z-index: 2;
  padding: 10px 0;
`
);

export const ReactionRolesContent: React.FC = () => {
  const { data } = useAuth();
  const { authActions } = useActions();

  const [reactionRoles = [], loading, { refetch }] = useQueryState({
    queryKey: data?.guild ? ["reactionRoles", data?.guild] : "reactionRoles",
    queryFn: () =>
      data?.guild ? reactionRolesApi.fetchReactionRoles(data?.guild) : [],
    onError: handleError,
  });

  const handleDelete = async (_id) => {
    try {
      await reactionRolesApi.deleteReactionRole(data?.guild, _id);
    } catch (err) {
      handleError(err);
    }
  };

  const triggerForm = (details?: REACTION_ROLE_DETAILS) => {
    window.modal({
      component: (props) => (
        <RoleForm {...props} details={details} onSubmit={refetch} />
      ),
    });
  };

  const triggerDelete = (_id) => {
    window.modal({ type: "confirmation", onConfirm: () => handleDelete(_id) });
  };

  const handleGuildChange = (guild) => {
    authActions.updateAuthData({ guild });
  };

  return (
    <ReactionRolesContainer>
      {!data.discord && !data.guild ? (
        <EmptyMessage
          message="Connect to discord"
          actions={
            <a href={discordConfig.url} rel="noreferrer">
              <CustomButton>Connect</CustomButton>
            </a>
          }
        />
      ) : !!data.discord && !data.guild ? (
        <EmptyMessage
          message="Choose a guild to access Reaction Roles"
          actions={
            <MaterialSelect
              value={data.guild}
              options={data.guilds || []}
              isString
              placeholder="Choose a Guild"
              label="Choose a Guild"
              containerProps={{ size: "small", sx: { width: "200px" } }}
              onChange={handleGuildChange}
            />
          }
        />
      ) : loading ? (
        <div>loading...</div>
      ) : reactionRoles.length === 0 ? (
        <EmptyMessage
          message="No reaction roles available"
          actions={
            <CustomButton variant="text" onClick={() => triggerForm()}>
              Add Roles
            </CustomButton>
          }
        />
      ) : (
        <>
          <ReactionRolesHeader>
            <div />
            <CustomButton endIcon={<AddIcon />} onClick={() => triggerForm()}>
              Add Roles
            </CustomButton>
          </ReactionRolesHeader>
          {reactionRoles.map((el, index) => (
            <ReactionRoleCard key={index}>
              <StyledLink to={`/member/reaction_roles/${el._id}`}>
                <CustomText variant="h3">{el.name}</CustomText>
              </StyledLink>
              <ReactionRoleActions>
                <CustomIconButton onClick={() => triggerForm(el)}>
                  <EditIcon />
                </CustomIconButton>
                <CustomIconButton onClick={() => triggerDelete(el._id)}>
                  <DeleteIcon />
                </CustomIconButton>
                <CustomIconButton>
                  <FiberManualRecordIcon />
                </CustomIconButton>
              </ReactionRoleActions>
            </ReactionRoleCard>
          ))}
        </>
      )}
    </ReactionRolesContainer>
  );
};

export * from "./configuration";
