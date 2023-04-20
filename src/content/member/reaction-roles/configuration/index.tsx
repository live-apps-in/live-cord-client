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
import {
  REACTION_ROLES_MAPPING_ADD,
  REACTION_ROLES_MAPPING_DETAIL,
  REACTION_ROLE_DETAILS,
} from "src/model";
import { reactionRolesFormSchema } from "src/schema";

const ReactionRoleConfigurationPageContainer = styled(
  // "div"
  "form"
)`
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
  const handleSubmit = (data: Partial<REACTION_ROLE_DETAILS>) => {
    console.log(data);
  };

  const formik = useFormik({
    initialValues: {
      rolesMapping: [
        {
          name: "",
          roleId: "",
          emoji: null,
        },
      ],
      discordEmbedConfig: {
        title: "",
        description: "",
        color: "",
        fields: [{ name: "", value: "", inline: true }],
        timestamp: null,
        author: "",
        footer: {
          text: "",
        },
      },
      guildId: "",
    },
    onSubmit: handleSubmit,
    validationSchema: reactionRolesFormSchema,
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

  const handleAddNewRole = () => {
    formik.setFieldValue("discordEmbedConfig.fields", [
      ...formik.values.discordEmbedConfig.fields,
      { name: "", value: "", inline: false },
    ]);
  };

  const removeSingleRole = (index) => {
    formik.setFieldValue(
      "discordEmbedConfig.fields",
      removeAt({ array: formik.values.discordEmbedConfig.fields, index })
    );
  };

  // sorting card
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

  const handleAddSortField = (details: REACTION_ROLES_MAPPING_ADD) => {
    formik.setFieldValue("rolesMapping", [
      ...formik.values.rolesMapping,
      {
        ...details,
        emoji: {
          name: details.name,
          type: "standard",
          standardEmoji: details.emoji,
        },
      },
    ]);
  };

  const handleRemoveSortField = (index) => {
    formik.setFieldValue(
      "rolesMapping",
      removeAt({ array: formik.values.rolesMapping, index })
    );
  };

  const handleEditSortField = (details, index) => {
    const rolesMapping = formik.values.rolesMapping;
    rolesMapping[index] = { ...rolesMapping[index], ...details };
    formik.setFieldValue("rolesMapping", rolesMapping);
  };

  return (
    <ReactionRoleConfigurationPageContainer
      onSubmit={(event) => {
        event.preventDefault();
        formik.handleSubmit(event);
      }}
    >
      <CustomCard>
        <RecursiveContainer
          config={generalDetails}
          formik={formik}
          validationSchema={reactionRolesFormSchema}
        />
        <CustomText variant="body1">Role Fields</CustomText>
        {fields.map((el, index) => (
          <RoleFieldRecursiveContainer key={index}>
            <RecursiveContainer
              config={el}
              formik={formik}
              validationSchema={reactionRolesFormSchema}
            />
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
          Add new role
        </CustomButton>
        <RecursiveContainer
          config={footerFields}
          formik={formik}
          validationSchema={reactionRolesFormSchema}
        />
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
          handleAddSortField={handleAddSortField}
          handleEditSortField={handleEditSortField}
          handleRemoveSortField={handleRemoveSortField}
          rolesMapping={formik.values.rolesMapping}
        />
      </FlexColumn>
    </ReactionRoleConfigurationPageContainer>
  );
};
