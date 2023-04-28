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
import { REACTION_ROLE_DETAILS } from "src/model";

interface ROLE_FORM_PROPS extends CUSTOM_MODAL_COMPONENT_PROPS {
  details?: REACTION_ROLE_DETAILS;
  onSubmit?: Function;
}

export const RoleForm: React.FC<ROLE_FORM_PROPS> = ({
  onCancel,
  onSubmit,
  details: existingDetails,
}) => {
  const { data } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (details) => {
    // console.log(details);
    setLoading(true);
    try {
      // if it is an edit modal
      if (existingDetails) {
        await reactionRolesApi.editReactionRole({
          ...details,
          guildId: data?.guild,
        });
      } else {
        // its an add modal
        await reactionRolesApi.addReactionRole({
          ...details,
          guildId: data.guild,
        });
      }
      onSubmit();
      onCancel();
    } catch (err) {
      handleError(err);
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      ...existingDetails,
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
          Submit
        </CustomButton>
      </form>
    </>
  );
};
