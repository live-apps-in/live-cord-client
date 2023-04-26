import { useFormik } from "formik";
import {
  CONFIG_TYPE,
  CUSTOM_MODAL_COMPONENT_PROPS,
  CustomButton,
  CustomIconButton,
  JustifyBetween,
  RecursiveContainer,
} from "src/components";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { handleError } from "src/utils";
import { reactionRolesApi } from "src/api";
import { useAuth } from "src/hooks";
import { ADD_REACTION_ROLE } from "src/model";

interface ADD_ROLE_FORM_PROPS extends CUSTOM_MODAL_COMPONENT_PROPS {
  afterAdd?: Function;
}

export const AddRoleForm: React.FC<ADD_ROLE_FORM_PROPS> = ({
  onCancel,
  afterAdd,
}) => {
  const { data } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (details: ADD_REACTION_ROLE) => {
    // console.log(details);
    setLoading(true);
    try {
      await reactionRolesApi.addReactionRole({
        ...details,
        guildId: data.guild,
      });
      afterAdd();
      onCancel();
    } catch (err) {
      handleError(err);
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: handleSubmit,
  });

  const config: CONFIG_TYPE = [
    {
      name: "name",
      placeholder: "Name",
    },
  ];

  return (
    <>
      <JustifyBetween>
        <div />
        <CustomIconButton onClick={() => onCancel()}>
          <CloseIcon />
        </CustomIconButton>
      </JustifyBetween>
      <form onSubmit={formik.handleSubmit}>
        <RecursiveContainer config={config} formik={formik} />
        <CustomButton loading={loading} type="submit">
          Add
        </CustomButton>
      </form>
    </>
  );
};
