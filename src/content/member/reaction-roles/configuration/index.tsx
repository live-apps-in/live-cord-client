import { styled } from "@mui/material";
import { useFormik } from "formik";
import {
  CONFIG_TYPE,
  CustomButton,
  CustomCard,
  CustomIconButton,
  CustomText,
  FlexColumn,
  FlexRow,
  RecursiveContainer,
} from "src/components";
import { mediaQuery } from "src/theme";
import AddIcon from "@mui/icons-material/Add";
import { ReactionRoleSort } from "./reaction-role-sort";
import { move, removeAt } from "src/utils";
import { EmbedBuilder } from "./embed-builder";
import CloseIcon from "@mui/icons-material/Close";
import { Divider } from "@material-ui/core";

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

const RoleFieldRecursiveContainer = styled(FlexRow)`
  gap: 10px;
`;

export const ReactionRoleConfigurationPageContent: React.FC = () => {
  const handleSubmit = (data) => {
    console.log(data);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      color: "",
      roleFields: [
        { name: "1", value: "", inline: true },
        { name: "2", value: "", inline: true },
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

  const roleFields: CONFIG_TYPE[] = formik.values.roleFields.map((_, index) => [
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
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
      valueIsString: true,
    },
  ]);

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

  const handleAddNewRole = () => {
    formik.setFieldValue("roleFields", [
      ...formik.values.roleFields,
      { name: "", value: "", inline: false },
    ]);
  };

  const removeSingleRole = (index) => {
    formik.setFieldValue(
      "roleFields",
      removeAt({ array: formik.values.roleFields, index })
    );
  };

  return (
    <ReactionRoleConfigurationPageContainer onSubmit={formik.handleSubmit}>
      <CustomCard>
        <RecursiveContainer config={generalDetails} formik={formik} />
        <CustomText variant="body1">Role Fields</CustomText>
        {roleFields.map((el, index) => (
          <RoleFieldRecursiveContainer key={index}>
            <RecursiveContainer config={el} formik={formik} />
            {roleFields.length > 1 && (
              <div>
                <CustomIconButton onClick={() => removeSingleRole(index)}>
                  <CloseIcon />
                </CustomIconButton>
              </div>
            )}
          </RoleFieldRecursiveContainer>
        ))}
        <CustomButton
          variant="text"
          startIcon={<AddIcon />}
          onClick={handleAddNewRole}
        >
          Add new roles
        </CustomButton>
        <RecursiveContainer config={footerFields} formik={formik} />
      </CustomCard>
      <FlexColumn style={{ gap: "30px" }}>
        <EmbedBuilder
          title={formik.values.title}
          description={formik.values.description}
          author={formik.values.author}
          footer={formik.values.footer}
          timestamp={formik.values.timestamp}
          fields={formik.values.roleFields}
          color={formik.values.color}
        />
        <ReactionRoleSort
          onPositionChange={handleRoleFieldsSort}
          roleFields={formik.values.roleFields}
        />
      </FlexColumn>
    </ReactionRoleConfigurationPageContainer>
  );
};
