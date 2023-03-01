import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DefaultAvatar } from "src/assets";
import { CustomCard, CustomText, FlexColumn } from "src/components";
import { GUILD_DETAILS } from "src/model";
import { mediaQuery } from "src/theme";

const StyledGuildCard = styled(CustomCard)`
  > div {
    display: grid;
    grid-template-columns: 50px auto;
    gap: 10px;
    align-items: center;
    ${mediaQuery.up("sm")} {
      grid-template-columns: 80px auto;
    }
    ${mediaQuery.up("md")} {
      grid-template-columns: 100px auto;
    }
  }
`;

const GuildProfileImage = styled("div")`
  padding: 10px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 50px;
  ${mediaQuery.up("sm")} {
    height: 80px;
  }
  ${mediaQuery.up("md")} {
    height: 100px;
  }
`;
const GuildContentWrapper = styled(FlexColumn)`
  padding: 10px;
`;

export const GuildCard: React.FC<GUILD_DETAILS> = (props) => {
  const { name, description, image, _id } = props;
  const navigate = useNavigate();

  return (
    <StyledGuildCard onClick={() => navigate(`/member/guild/${_id}`)}>
      <GuildProfileImage
        style={{ backgroundImage: `url(${image || DefaultAvatar})` }}
      />
      <GuildContentWrapper>
        <CustomText variant="h3">{name}</CustomText>
        <CustomText variant="body1">{description}</CustomText>
      </GuildContentWrapper>
    </StyledGuildCard>
  );
};
