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
import { AddRoleForm } from "./add-role-form";

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

  const [reactionRoles = []] = useQueryState({
    queryKey: data?.guild ? ["reactionRoles", data?.guild] : "reactionRoles",
    queryFn: () =>
      data?.guild ? reactionRolesApi.fetchReactionRoles(data?.guild) : [],
    onError: handleError,
  });

  const handleClick = () => {
    window.modal({ component: AddRoleForm });
  };

  return (
    <ReactionRolesContainer>
      {reactionRoles.length === 0 ? (
        <EmptyMessage
          message="No reaction roles available"
          actions={<CustomButton variant="text">Add Roles</CustomButton>}
        />
      ) : (
        <>
          <ReactionRolesHeader>
            <div />
            <CustomButton endIcon={<AddIcon />} onClick={handleClick}>
              Add Roles
            </CustomButton>
          </ReactionRolesHeader>
          {reactionRoles.map((el, index) => (
            <ReactionRoleCard key={index}>
              <StyledLink to={`/member/reaction_roles/${el._id}`}>
                <CustomText variant="h3">{el.name}</CustomText>
              </StyledLink>
              <ReactionRoleActions>
                <CustomIconButton>
                  <EditIcon />
                </CustomIconButton>
                <CustomIconButton>
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
