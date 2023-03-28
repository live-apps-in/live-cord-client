import { styled } from "@mui/material";
import { useFormik } from "formik";
import {
  CONFIG_TYPE,
  CustomButton,
  CustomCard,
  CustomText,
  FlexColumn,
  RecursiveContainer,
} from "src/components";
import { mediaQuery } from "src/theme";
import AddIcon from "@mui/icons-material/Add";
import { ReactionRoleSort } from "./reaction-role-sort";
import { move } from "src/utils";

const ReactionRoleConfigurationPageContainer = styled("form")`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  ${mediaQuery.up("md")} {
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 30px;
    padding: 40px;
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
      roleFields: [
        { name: "1", value: "", inline: "" },
        { name: "2", value: "", inline: "" },
        { name: "3", value: "", inline: "" },
        { name: "4", value: "", inline: "" },
      ],
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

  const handleRoleFieldsSort = ({ oldIndex, newIndex }) => {
    formik.setFieldValue(
      "roleFields",
      move({
        array: formik.values.roleFields,
        from: oldIndex,
        to: newIndex,
      })
    );
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
      <FlexColumn style={{ gap: "30px" }}>
        <CustomCard>
          <CustomText variant="h5">Embed Builder</CustomText>
        </CustomCard>
        <ReactionRoleSort
          onPositionChange={handleRoleFieldsSort}
          roleFields={formik.values.roleFields}
        />
      </FlexColumn>
    </ReactionRoleConfigurationPageContainer>
  );
};
