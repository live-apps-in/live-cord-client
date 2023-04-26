import { styled } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  CONFIG_TYPE,
  CustomIconButton,
  CustomText,
  FlexRow,
  RecursiveContainer,
} from "src/components";
import { SortableHandle } from "react-sortable-hoc";
import { REACTION_ROLES_MAPPING_DETAIL } from "src/model";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

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

const StyledReactionRoleElementEdit = styled("div")(
  ({ theme }) => `
        display: flex;
        gap: 10px;
        align-items: center;
        padding: 10px;
        border-radius: 10px;   
        background-color: ${theme.colors.white};
    `
);

const DragHandle = SortableHandle(() => <DragIndicatorIcon />);

export type REACTION_ROLE_SORT_ELEMENT_PROPS = REACTION_ROLES_MAPPING_DETAIL & {
  onEditEnd?: (
    details: Partial<REACTION_ROLES_MAPPING_DETAIL>,
    index: number
  ) => void;
  onDeleteEnd?: (index: number) => void;
  elementIndex?: number;
};

export const ReactionRoleSortElement: React.FC<
  REACTION_ROLE_SORT_ELEMENT_PROPS
> = (props) => {
  const { onEditEnd, onDeleteEnd, elementIndex, ...rest } = props;
  const [editMode, setEditMode] = useState(false);

  const handleSubmit = (data) => {
    // console.log(data);
    onEditEnd(data, elementIndex);
    setEditMode(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      emoji: null,
    },
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    formik.setValues(rest);
  }, [elementIndex]);

  const config: CONFIG_TYPE = [
    {
      name: "name",
      placeholder: "Role Name",
    },
    {
      name: "emoji.standardEmoji",
      placeholder: "Emoji Name",
    },
  ];

  const handleRemove = () => {
    window.modal({
      type: "confirmation",
      onConfirm: () => onDeleteEnd(elementIndex),
    });
  };

  return editMode ? (
    <StyledReactionRoleElementEdit>
      <DragHandle />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          formik.handleSubmit(event);
        }}
      >
        <RecursiveContainer config={config} formik={formik} />
        <CustomIconButton type="submit">
          <CheckIcon />
        </CustomIconButton>
        <CustomIconButton onClick={() => setEditMode(false)}>
          <CloseIcon />
        </CustomIconButton>
      </form>
    </StyledReactionRoleElementEdit>
  ) : (
    <StyledReactionRoleElement>
      <DragHandle />
      <CustomText variant="h4">{rest.name}</CustomText>
      <FlexRow style={{ gap: "10px", alignItems: "center" }}>
        <CustomText variant="h6">{rest.emoji?.standardEmoji}</CustomText>
        <CustomIconButton onClick={() => setEditMode(true)}>
          <EditIcon />
        </CustomIconButton>
        <CustomIconButton onClick={handleRemove}>
          <DeleteIcon />
        </CustomIconButton>
      </FlexRow>
    </StyledReactionRoleElement>
  );
};
