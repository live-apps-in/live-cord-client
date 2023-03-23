import {
  styled,
  List,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomText } from "src/components";
import { NAVIGATION_PROPS } from "src/routes";
import { mediaQuery } from "src/theme";
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

const StyledListContainer = styled(Box)``;

const ListGroup = styled("div")`
  padding: 10px 0;
`;

const ListGroupHeader = styled(CustomText)`
  padding-bottom: 5px;
`;

const DesktopSidebarWrapper = styled(Box)`
  display: none;
  ${mediaQuery.up("md")} {
    display: block;
    width: 300px;
    height: 100vh;
  }
`;

const StyledListItemButton = styled((props: any) => (
  <ListItemButton {...props} />
))(
  ({ isActive }) => `
  border-radius: 10px;
  pading: 8px 9px;
  ${isActive ? `background-color: rgba(230, 230, 230, 1)` : ""}
`
);

export const DesktopSidebar: React.FC<SIDEBAR_PROPS> = ({
  navigationProps = [],
}) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [updatedPathname, setUpdatedPathname] = useState(pathname);

  useEffect(() => {
    setUpdatedPathname(pathname);
  }, [pathname]);

  const selectedItem = removeSlashAtLast(updatedPathname);
  console.log(selectedItem, "-----selectedItem-----");

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

  const desktopSidebar = (
    <DesktopSidebarWrapper>{sidebarMenuItems}</DesktopSidebarWrapper>
  );

  return desktopSidebar;
};
