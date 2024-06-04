import { Drawer } from "@mui/material";
import DrawerList from "./DrawerList";

const AppDrawer = () => {
  return (
    <Drawer
      elevation={4}
      variant="permanent"
      sx={{
        width: 224,
        flexShrink: 0,
        zIndex: 2,
        [`& .MuiDrawer-paper`]: { width: 224, boxSizing: "border-box" },
      }}
    >
      <DrawerList />
    </Drawer>
  );
};

export default AppDrawer;
