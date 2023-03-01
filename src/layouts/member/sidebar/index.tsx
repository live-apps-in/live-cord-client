import {
  styled,
  Drawer,
  List,
  Box,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomIconButton, CustomText } from "src/components";
import { NAVIGATION_LINKS } from "src/routes";
import { mediaQuery } from "src/theme";
import MenuIcon from "@mui/icons-material/Menu";
import { getValidRouteName, removeSlashAtLast } from "src/utils";
// import { Logo } from "../header/logo";

interface SIDEBAR_PROPS {
  navigationLinks?: NAVIGATION_LINKS;
}

// const StyledLogoContainer = styled("div")`
//   position: sticky;
//   top: 0;
// `;

const StyledListContainer = styled(Box)`
  width: 50vw;
  ${mediaQuery.up("sm")} {
    width: 30vw;
  }
`;

export const Sidebar: React.FC<SIDEBAR_PROPS> = ({ navigationLinks = [] }) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [updatedPathname, setUpdatedPathname] = useState(pathname);

  useEffect(() => {
    setUpdatedPathname(pathname);
  }, [pathname]);

  const selectedItem = removeSlashAtLast(updatedPathname);

  return (
    <>
      <CustomIconButton onClick={() => setOpen(true)}>
        <MenuIcon />
      </CustomIconButton>
      <Drawer open={open} onClose={() => setOpen(false)}>
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
      </Drawer>
    </>
  );
};
