import {
  styled,
  Drawer,
  List,
  Box,
  ListItem,
  ListItemButton,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomIconButton, CustomText } from "src/components";
import { NAVIGATION_LINKS } from "src/routes";
import { mediaQuery } from "src/theme";
import MenuIcon from "@mui/icons-material/Menu";
import { getValidRouteName, removeSlashAtLast } from "src/utils";
import { HeaderLogo } from "../header";
// import { Logo } from "../header/logo";

interface SIDEBAR_PROPS {
  navigationLinks?: NAVIGATION_LINKS;
}

// const StyledLogoContainer = styled("div")`
//   position: sticky;
//   top: 0;
// `;

const SidebarContentContainer = styled("div")`
  padding: 20px 0;
`;

const StyledListContainer = styled(Box)``;

const MobileSidebarWrapper = styled("div")`
  display: block;
  ${mediaQuery.up("md")} {
    display: none;
  }
`;

const MobileSidebarListContainer = styled("div")`
  width: 40vw;
  ${mediaQuery.up("sm")} {
    width: 30vw;
  }
`;

export const MobileSidebar: React.FC<SIDEBAR_PROPS> = ({
  navigationLinks = [],
}) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [updatedPathname, setUpdatedPathname] = useState(pathname);
  const theme = useTheme();

  useEffect(() => {
    setUpdatedPathname(pathname);
  }, [pathname]);

  const selectedItem = removeSlashAtLast(updatedPathname);

  const sidebarMenuItems = (
    <SidebarContentContainer>
      <HeaderLogo />
      <StyledListContainer>
        <List>
          {navigationLinks.map((el) => (
            <ListItem key={el.path} disablePadding>
              <ListItemButton
                onClick={() => navigate(getValidRouteName(el.path))}
              >
                <CustomText>{el.name}</CustomText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </StyledListContainer>
    </SidebarContentContainer>
  );

  const mobileSidebar = (
    <MobileSidebarWrapper>
      <CustomIconButton onClick={() => setOpen(true)}>
        <MenuIcon />
      </CustomIconButton>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <MobileSidebarListContainer>
          {sidebarMenuItems}
        </MobileSidebarListContainer>
      </Drawer>
    </MobileSidebarWrapper>
  );

  return mobileSidebar;
};
