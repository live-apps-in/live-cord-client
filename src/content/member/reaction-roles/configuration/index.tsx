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
import { REACTION_ROLE_DETAILS } from "src/model";

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
  const handleSubmit = (data: REACTION_ROLE_DETAILS) => {
    console.log(data);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      rolesMapping: [
        {
          name: "1",
          roleId: "1",
          emoji: {
            id: "1",
            name: "Test 1",
            standardEmoji: "😀",
            type: "standard",
          },
        },
        {
          name: "2",
          roleId: "2",
          emoji: {
            id: "2",
            name: "Test 2",
            standardEmoji: "😁",
            type: "guild",
          },
        },
      ],
      discordEmbedConfig: {
        title: "",
        description: "",
        color: "",
        fields: [
          { name: "1", value: "", inline: true },
          { name: "2", value: "", inline: true },
        ],
        timestamp: null,
        author: "",
        footer: {
          text: "",
        },
      },
      guildId: "",
    },
    onSubmit: handleSubmit,
  });

  const generalDetails: CONFIG_TYPE = [
    {
      name: "discordEmbedConfig.title",
      label: "Title",
    },
    {
      name: "discordEmbedConfig.description",
      label: "Description",
    },
    {
      name: "discordEmbedConfig.color",
      label: "Color",
      type: "color",
    },
  ];

  const fields: CONFIG_TYPE[] = formik.values.discordEmbedConfig.fields.map(
    (_, index) => [
      {
        name: `discordEmbedConfig.fields[${index}].name`,
        label: "Name",
      },
      {
        name: `discordEmbedConfig.fields[${index}].value`,
        label: "Value",
      },
      {
        name: `discordEmbedConfig.fields[${index}].inline`,
        label: "Yes / No",
        type: "select",
        options: [
          { label: "Yes", value: true },
          { label: "No", value: false },
        ],
        valueIsString: true,
      },
    ]
  );

  const footerFields: CONFIG_TYPE = [
    {
      name: "discordEmbedConfig.timestamp",
      label: "Timestamp",
    },
    {
      name: "discordEmbedConfig.author",
      label: "Author",
    },
    {
      name: "discordEmbedConfig.footer.text",
      label: "Footer",
    },
  ];

  const handleFieldsSort = ({ oldIndex, newIndex }) => {
    formik.setFieldValue(
      "rolesMapping",
      move({
        array: formik.values.rolesMapping,
        from: oldIndex,
        to: newIndex,
      })
    );
  };

  const handleAddNewRole = () => {
    formik.setFieldValue("discordEmbedConfig.fields", [
      ...formik.values.discordEmbedConfig.fields,
      { name: "", value: "", inline: false },
    ]);
    formik.setFieldValue("rolesMapping", [
      ...formik.values.rolesMapping,
      { name: "", emoji: "" },
    ]);
  };

  const removeSingleRole = (index) => {
    formik.setFieldValue(
      "discordEmbedConfig.fields",
      removeAt({ array: formik.values.discordEmbedConfig.fields, index })
    );
    formik.setFieldValue(
      "rolesMapping",
      removeAt({ array: formik.values.rolesMapping, index })
    );
  };

  return (
    <ReactionRoleConfigurationPageContainer onSubmit={formik.handleSubmit}>
      <CustomCard>
        <RecursiveContainer config={generalDetails} formik={formik} />
        <CustomText variant="body1">Role Fields</CustomText>
        {fields.map((el, index) => (
          <RoleFieldRecursiveContainer key={index}>
            <RecursiveContainer config={el} formik={formik} />
            {fields.length > 1 && (
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
          title={formik.values.discordEmbedConfig.title}
          description={formik.values.discordEmbedConfig.description}
          author={formik.values.discordEmbedConfig.author}
          footer={formik.values.discordEmbedConfig.footer}
          timestamp={formik.values.discordEmbedConfig.timestamp}
          fields={formik.values.discordEmbedConfig.fields}
          color={formik.values.discordEmbedConfig.color}
          rolesMapping={formik.values.rolesMapping}
        />
        <ReactionRoleSort
          onPositionChange={handleFieldsSort}
          rolesMapping={formik.values.rolesMapping}
        />
      </FlexColumn>
    </ReactionRoleConfigurationPageContainer>
  );
};
