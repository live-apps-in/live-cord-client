import {
  styled,
  Drawer,
  List,
  Box,
  ListItem,
  ListItemButton,
  useTheme,
  ListItemIcon,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomIconButton, CustomText } from "src/components";
import { NAVIGATION_PROPS } from "src/routes";
import { mediaQuery } from "src/theme";
import MenuIcon from "@mui/icons-material/Menu";
import { getValidRouteName, isActiveRoute, removeSlashAtLast } from "src/utils";
import { HeaderLogo } from "../header";
// import { Logo } from "../header/logo";

interface SIDEBAR_PROPS {
  navigationProps?: NAVIGATION_PROPS;
}

// const StyledLogoContainer = styled("div")`
//   position: sticky;
//   top: 0;
// `;

const SidebarContentContainer = styled("div")`
  padding: 20px;
`;

const ListGroup = styled("div")`
  padding: 10px 0;
`;

const ListGroupHeader = styled(CustomText)`
  padding-bottom: 5px;
`;

const StyledListContainer = styled(Box)``;

const StyledListItemButton = styled((props: any) => (
  <ListItemButton {...props} />
))(
  ({ isActive }) => `
  border-radius: 10px;
  pading: 8px 9px;
  ${isActive ? `background-color: rgba(230, 230, 230, 1)` : ""}
`
);

const MobileSidebarWrapper = styled("div")`
  display: block;
  ${mediaQuery.up("md")} {
    display: none;
  }
`;

const MobileSidebarListContainer = styled("div")`
  width: 250px;
  ${mediaQuery.up("sm")} {
    width: 40vw;
  }
  ${mediaQuery.up("md")} {
    width: 30vw;
  }
`;

export const MobileSidebar: React.FC<SIDEBAR_PROPS> = ({
  navigationProps = [],
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
          {navigationProps.map((el) => (
            <ListGroup key={el.heading}>
              <ListGroupHeader variant="body2">{el.heading}</ListGroupHeader>
              {el.content.map((ele) => (
                <ListItem key={ele.path} disablePadding>
                  <StyledListItemButton
                    isActive={isActiveRoute({
                      path: pathname,
                      route: ele.path,
                    })}
                    onClick={() => navigate(getValidRouteName(ele.path))}
                  >
                    {ele.icon && <ListItemIcon>{ele.icon}</ListItemIcon>}
                    <CustomText variant="body1">{ele.name}</CustomText>
                  </StyledListItemButton>
                </ListItem>
              ))}
            </ListGroup>
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
