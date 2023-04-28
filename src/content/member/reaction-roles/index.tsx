import { styled } from "@mui/material";
import {
  CustomButton,
  CustomIconButton,
  CustomText,
  EmptyMessage,
  FlexRow,
  JustifyBetween,
} from "src/components";
import { mediaQuery } from "src/theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useAuth, useQueryState } from "src/hooks";
import { reactionRolesApi } from "src/api";
import { handleError } from "src/utils";
import { RoleForm } from "./role-form";
import { REACTION_ROLE_DETAILS } from "src/model";

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

  return (
    <ReactionRolesContainer>
      {loading ? (
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
