import { AppBar, Box, Stack, Toolbar } from "@mui/material";
import AppHeader from "components/Layout/AppHeader";
import AppDrawer from "components/Layout/AppDrawer";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box>
      <AppHeader />
      <Toolbar />
      <Stack display={"flex"} direction={"row"}>
        <AppDrawer />
        <Box padding={1}>
          <Outlet />
        </Box>
      </Stack>
    </Box>
  );
};

export default Layout;
