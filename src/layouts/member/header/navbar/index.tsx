import { useTheme, styled } from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUniqueKey } from "src/hooks";
import { NAVIGATION_LINKS } from "src/routes";
import { mediaQuery } from "src/theme";
import { getValidRouteName, removeSlashAtLast } from "src/utils";

interface NAVBAR_PROPS {
  navigationLinks?: NAVIGATION_LINKS;
}

const StyledNavbarWrapper = styled("div")`
  display: none;
  ${mediaQuery.up(1092)} {
    display: block;
  }
`;

// const StyledTab = styled(Tab)(({ theme }) => `
//   padding: 0 !important;
//   &::after {
//     background-color: ${theme.colors.primary};
//   }
//   > span > a > * {
//     padding: 12px 10px;
//   }
// `);

export const Navbar: React.FC<NAVBAR_PROPS> = ({ navigationLinks = [] }) => {
  const keys = useUniqueKey(navigationLinks);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [updatedPathname, setUpdatedPathname] = useState(pathname);

  useEffect(() => {
    setUpdatedPathname(pathname);
  }, [pathname]);

  return (
    <StyledNavbarWrapper>
      <Tabs
        variant="scrollable"
        onChange={(event, newValue) => navigate(getValidRouteName(newValue))}
        color={theme.colors.primary}
        value={removeSlashAtLast(updatedPathname)}
      >
        {navigationLinks.map((el, index) => (
          // TODO: complete children implementation
          //   el.children ?
          //     <CustomDropdown
          //       appearance="transparent"
          //       placeholder={el.name}
          //       style={{border: 'none'}}
          //       isNav
          //       selectedOptions={[removeSlashAtLast(updatedPathname)]}
          //       options={el.children.map((el) => ({
          //         value: el.path,
          //         label: el.name,
          //       }))}
          //       onChange={({ target: { value } }) => navigate(getValidRouteName(value))}
          //     />
          // :
          <Tab key={keys[index]} label={el.name} value={el.path} />
        ))}
      </Tabs>
    </StyledNavbarWrapper>
  );
};

// export {};
