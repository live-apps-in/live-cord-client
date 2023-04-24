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

export const AddRoleForm: React.FC<CUSTOM_MODAL_COMPONENT_PROPS> = ({
  onCancel,
}) => {
  const handleSubmit = (data) => {
    console.log(data);
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
        <CustomButton type="submit">Add</CustomButton>
      </form>
    </>
  );
};
