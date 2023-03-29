import { styled } from "@mui/material";
import {
  CustomCard,
  CustomText,
  FlexRow,
  JustifyBetween,
} from "src/components";
import { EMBED_BUILDER_PROPS } from "src/model";

const Header = styled(FlexRow)`
  gap: 10px;
`;

const EmbedPreviewContainer = styled(JustifyBetween)(
  ({ color }) => `
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  border-left: 7px solid ${color};
  background-color: rgba(242, 242, 242, 1);
`
);

const RoleFieldsContainer = styled("div")`
  padding: 10px 0;
`;

const RoleField = styled<any>("div")(
  ({ inline }) => `
  display: ${inline ? "inline-block" : "block"};
  margin: 10px;
  padding: 3px;
  width: fit-content;
`
);

export const EmbedBuilder: React.FC<EMBED_BUILDER_PROPS> = (props) => {
  const {
    title,
    description,
    author,
    footer,
    timestamp,
    roleFields = [],
    color,
  } = props;

  return (
    <CustomCard>
      <Header>
        <CustomText variant="h5">Embed Builder</CustomText>
      </Header>
      <EmbedPreviewContainer color={color}>
        <div>
          <CustomText variant="h5">{title}</CustomText>
          <CustomText variant="body2">{description}</CustomText>
          <RoleFieldsContainer>
            {roleFields.map((roleField, index) => (
              <RoleField inline={roleField.inline} key={index}>
                <CustomText
                  style={{ display: "block", fontWeight: "bold" }}
                  variant="caption"
                >
                  {roleField.name}
                </CustomText>
                <CustomText style={{ display: "block" }}>
                  {roleField.value}
                </CustomText>
              </RoleField>
            ))}
          </RoleFieldsContainer>
          <CustomText variant="caption">
            {footer} {author} {timestamp}
          </CustomText>
        </div>
      </EmbedPreviewContainer>
    </CustomCard>
  );
};
