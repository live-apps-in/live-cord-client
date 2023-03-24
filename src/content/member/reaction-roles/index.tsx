import { styled } from "@mui/material";
import {
  CustomButton,
  CustomIconButton,
  CustomText,
  FlexRow,
  JustifyBetween,
} from "src/components";
import { mediaQuery } from "src/theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

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
  const reactionRoles = [
    {
      name: "Gaming Roles",
      id: "1",
    },
    {
      name: "Development Roles",
      id: "2",
    },
    {
      name: "Anime Roles",
      id: "3",
    },
    {
      name: "Anime Roles",
      id: "3",
    },
    {
      name: "Anime Roles",
      id: "3",
    },
    {
      name: "Anime Roles",
      id: "3",
    },
    {
      name: "Anime Roles",
      id: "3",
    },
    {
      name: "Anime Roles",
      id: "3",
    },
    {
      name: "Anime Roles",
      id: "3",
    },
    {
      name: "Anime Roles",
      id: "3",
    },
    {
      name: "Anime Roles",
      id: "3",
    },
    {
      name: "Anime Roles",
      id: "3",
    },
  ];

  return (
    <ReactionRolesContainer>
      <ReactionRolesHeader>
        <div />
        <CustomButton endIcon={<AddIcon />}>Add Roles</CustomButton>
      </ReactionRolesHeader>
      {reactionRoles.map((el, index) => (
        <ReactionRoleCard key={index}>
          <StyledLink to={`/member/reaction_roles/${el.id}`}>
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
    </ReactionRolesContainer>
  );
};

export * from "./configuration";
