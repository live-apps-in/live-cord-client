import { styled } from "@mui/material";
import { useFormik } from "formik";
import {
  CONFIG_TYPE,
  CustomButton,
  CustomCard,
  CustomText,
  RecursiveContainer,
} from "src/components";
import { mediaQuery } from "src/theme";
import AddIcon from "@mui/icons-material/Add";

const ReactionRoleConfigurationPageContainer = styled("form")`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  ${mediaQuery.up("md")} {
    flex-direction: row;
    gap: 30px;
  }
`;

export const ReactionRoleConfigurationPageContent: React.FC = () => {
  const handleSubmit = (data) => {
    const updatedData = {
      ...data,
      roleFields: convertInlineValues(data.roleFields),
    };
    console.log(updatedData);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      color: "",
      roleFields: [{ name: "", value: "", inline: "" }],
      timestamp: null,
      author: "",
      footer: "",
    },
    onSubmit: handleSubmit,
  });

  const generalDetails: CONFIG_TYPE = [
    {
      name: "title",
      label: "Title",
    },
    {
      name: "description",
      label: "Description",
    },
    {
      name: "color",
      label: "Color",
      type: "color",
    },
  ];

  const roleFields: CONFIG_TYPE = formik.values.roleFields
    .map((_, index) => [
      {
        name: `roleFields[${index}].name`,
        label: "Name",
      },
      {
        name: `roleFields[${index}].value`,
        label: "Value",
      },
      {
        name: `roleFields[${index}].inline`,
        label: "Yes / No",
        type: "select",
        options: ["Yes", "No"],
        isString: true,
      },
    ])
    .flat(1);

  console.log(formik.values);

  const footerFields: CONFIG_TYPE = [
    {
      name: "timestamp",
      label: "Timestamp",
    },
    {
      name: "author",
      label: "Author",
    },
    {
      name: "footer",
      label: "Footer",
    },
  ];

  const convertInlineValues = (values) => {
    return values.map((el) => ({ ...el, inline: el.inline === "Yes" }));
  };

  return (
    <ReactionRoleConfigurationPageContainer onSubmit={formik.handleSubmit}>
      <CustomCard>
        <RecursiveContainer config={generalDetails} formik={formik} />
        <CustomText variant="body1">Role Fields</CustomText>
        <RecursiveContainer config={roleFields} formik={formik} />
        <CustomButton variant="text" startIcon={<AddIcon />}>
          Add new roles
        </CustomButton>
        <RecursiveContainer config={footerFields} formik={formik} />
      </CustomCard>
    </ReactionRoleConfigurationPageContainer>
  );
};
