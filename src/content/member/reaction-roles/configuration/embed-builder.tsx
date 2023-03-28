import { styled } from "@mui/material";
import {
  CustomCard,
  CustomText,
  FlexRow,
  JustifyBetween,
} from "src/components";
import { EMBED_BUILDER_PROPS } from "src/model";
import { DiscordIcon } from "src/theme";

const Header = styled(FlexRow)`
  gap: 10px;
`;

const EmbedPreviewContainer = styled(JustifyBetween)`
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  border-left: 7px solid green;
  background-color: rgba(242, 242, 242, 1);
`;

export const EmbedBuilder: React.FC<EMBED_BUILDER_PROPS> = (props) => {
  const { title, description, author, inline, footer, timestamp } = props;

  return (
    <CustomCard>
      <Header>
        <DiscordIcon />
        <CustomText variant="h5">Embed Builder</CustomText>
      </Header>
      <EmbedPreviewContainer>
        <div>
          <CustomText variant="h5">{title}</CustomText>
          <CustomText variant="body2">{description}</CustomText>
          <CustomText variant="caption">
            {footer} {author} {timestamp}
          </CustomText>
        </div>
      </EmbedPreviewContainer>
    </CustomCard>
  );
};
