import { AppBar, Box, Stack, Toolbar } from "@mui/material";
import AppDrawer from "components/Drawer/AppDrawer";
import AppHeader from "components/Header/AppHeader";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box>
      <AppHeader />
      <Toolbar />
      <Stack display={"flex"} direction={"row"}>
        <AppDrawer />
        <Box width={"100%"}>
          <Outlet />
        </Box>
      </Stack>
    </Box>
  );
};

export default Layout;
