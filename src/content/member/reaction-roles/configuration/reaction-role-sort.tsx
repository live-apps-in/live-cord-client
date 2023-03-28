import { styled } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { CustomCard, CustomIconButton, CustomText } from "src/components";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableElementProps,
  SortableHandle,
} from "react-sortable-hoc";
import { REACTION_ROLE_SORT, REACTION_ROLE_SORT_ITEM } from "src/model";

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

const Element = SortableElement<SortableElementProps & REACTION_ROLE_SORT_ITEM>(
  ({ name }) => (
    <StyledReactionRoleElement>
      <DragHandle />
      <CustomText variant="h4">{name}</CustomText>
      <CustomIconButton>
        <DeleteIcon />
      </CustomIconButton>
    </StyledReactionRoleElement>
  )
);

interface REACTION_ROLE_SORT_COMPONENT_PROPS extends REACTION_ROLE_SORT {
  onPositionChange: SortableContainerProps["onSortEnd"];
}

export const ReactionRoleSort: React.FC<REACTION_ROLE_SORT_COMPONENT_PROPS> = (
  props
) => {
  const { roleFields = [], onPositionChange } = props;
  return (
    <Container onSortEnd={onPositionChange} useDragHandle>
      {roleFields.map((el, index) => (
        <Element name={el.name} index={index} key={index} />
      ))}
    </Container>
  );
};
