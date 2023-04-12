import { styled } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  CustomCard,
  CustomIconButton,
  CustomText,
  FlexRow,
} from "src/components";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableElementProps,
  SortableHandle,
} from "react-sortable-hoc";
import {
  REACTION_ROLES_MAPPING_DETAIL,
  REACTION_ROLE_DETAILS,
} from "src/model";

const StyledReactionRoleElement = styled("div")(
  ({ theme }) => `
  display: grid;
  grid-template-columns: 50px auto 100px;
  align-items: center;
  padding: 10px;
  background-color: ${theme.colors.white};
  border-radius: 10px;
`
);

const Container = SortableContainer<SortableContainerProps & { children: any }>(
  ({ children }) => <CustomCard>{children}</CustomCard>
);

const DragHandle = SortableHandle(() => <DragIndicatorIcon />);

const Element = SortableElement<
  SortableElementProps & REACTION_ROLES_MAPPING_DETAIL
>(({ name, emoji }) => (
  <StyledReactionRoleElement>
    <DragHandle />
    <CustomText variant="h4">{name}</CustomText>
    <FlexRow style={{ gap: "10px", alignItems: "center" }}>
      <CustomText variant="h6">{emoji?.standardEmoji}</CustomText>
      <CustomIconButton>
        <EditIcon />
      </CustomIconButton>
      <CustomIconButton>
        <DeleteIcon />
      </CustomIconButton>
    </FlexRow>
  </StyledReactionRoleElement>
));

interface REACTION_ROLE_SORT_COMPONENT_PROPS {
  rolesMapping: REACTION_ROLE_DETAILS["rolesMapping"];
  onPositionChange: SortableContainerProps["onSortEnd"];
}

export const ReactionRoleSort: React.FC<REACTION_ROLE_SORT_COMPONENT_PROPS> = (
  props
) => {
  const { rolesMapping = [], onPositionChange } = props;
  return (
    <Container onSortEnd={onPositionChange} useDragHandle>
      {rolesMapping.map((el, index) => (
        <Element {...el} index={index} key={el.roleId} />
      ))}
    </Container>
  );
};
