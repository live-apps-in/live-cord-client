import {
  CONFIG_TYPE,
  CustomButton,
  CustomCard,
  RecursiveContainer,
} from "src/components";
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableElementProps,
} from "react-sortable-hoc";
import {
  REACTION_ROLES_MAPPING_ADD,
  REACTION_ROLES_MAPPING_DETAIL,
  REACTION_ROLE_DETAILS,
} from "src/model";
import {
  REACTION_ROLE_SORT_ELEMENT_PROPS,
  ReactionRoleSortElement,
} from "./reaction-role-sort-element";
import { useFormik } from "formik";
import { styled } from "@mui/material";

const StyledForm = styled("form")`
  display: flex;
  gap: 10px;
`;

const Container = SortableContainer<SortableContainerProps & { children: any }>(
  ({ children }) => <CustomCard>{children}</CustomCard>
);

const Element = SortableElement<
  SortableElementProps &
    REACTION_ROLES_MAPPING_DETAIL &
    REACTION_ROLE_SORT_ELEMENT_PROPS
>(ReactionRoleSortElement);

interface REACTION_ROLE_SORT_COMPONENT_PROPS {
  rolesMapping: REACTION_ROLE_DETAILS["rolesMapping"];
  handleAddSortField: (details: REACTION_ROLES_MAPPING_ADD) => void;
  handleEditSortField: (
    details: REACTION_ROLES_MAPPING_DETAIL,
    index: number
  ) => void;
  handleRemoveSortField: (index: number) => void;
  onPositionChange: SortableContainerProps["onSortEnd"];
}

export const ReactionRoleSort: React.FC<REACTION_ROLE_SORT_COMPONENT_PROPS> = (
  props
) => {
  const {
    rolesMapping = [],
    onPositionChange,
    handleAddSortField,
    handleEditSortField,
    handleRemoveSortField,
  } = props;

  const handleSubmit = (data) => {
    handleAddSortField(data);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      emoji: "",
    },
    onSubmit: handleSubmit,
  });

  const config: CONFIG_TYPE = [
    {
      name: "name",
      placeholder: "Name",
    },
    {
      name: "emoji",
      placeholder: "Emoji",
    },
  ];

  return (
    <Container onSortEnd={onPositionChange} useDragHandle>
      {rolesMapping.map((el, index) => (
        <Element
          {...el}
          onDeleteEnd={handleRemoveSortField}
          onEditEnd={handleEditSortField}
          index={index}
          elementIndex={index}
          key={el.roleId}
        />
      ))}
      <StyledForm onSubmit={formik.handleSubmit}>
        <RecursiveContainer formik={formik} config={config} />
        <CustomButton type="submit">Add</CustomButton>
      </StyledForm>
    </Container>
  );
};
