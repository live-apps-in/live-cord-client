import { styled, List, Box, ListItem, ListItemButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomText } from "src/components";
import { NAVIGATION_LINKS } from "src/routes";
import { mediaQuery } from "src/theme";
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

const DesktopSidebarWrapper = styled(Box)`
  display: none;
  ${mediaQuery.up("md")} {
    display: block;
    width: 350px;
    height: 100vh;
  }
`;

export const DesktopSidebar: React.FC<SIDEBAR_PROPS> = ({
  navigationLinks = [],
}) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [updatedPathname, setUpdatedPathname] = useState(pathname);

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

  const desktopSidebar = (
    <DesktopSidebarWrapper>{sidebarMenuItems}</DesktopSidebarWrapper>
  );

  return desktopSidebar;
};
