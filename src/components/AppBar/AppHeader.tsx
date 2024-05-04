import { Domain, Home, Search } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AppHeader = () => {
  const navigate = useNavigate();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 224,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 224, boxSizing: "border-box" },
      }}
    >
      <AppBar elevation={1} color="default">
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            sx={{
              display: localStorage.getItem("isLogin") ? "none" : "flex",
            }}
            onClick={(e) => navigate("/signin")}
          >
            Войти
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <Toolbar />
        <ListItemButton onClick={(e) => navigate("/")}>
          <ListItemIcon>
            <Home fontSize="medium" />
          </ListItemIcon>
          <ListItemText primary="Главная" />
        </ListItemButton>
        <ListItemButton onClick={(e) => navigate("/organizations")}>
          <ListItemIcon>
            <Domain fontSize="medium" />
          </ListItemIcon>
          <ListItemText primary="Организации" />
        </ListItemButton>
        <ListItemButton onClick={(e) => navigate("/search")}>
          <ListItemIcon>
            <Search fontSize="medium" />
          </ListItemIcon>
          <ListItemText primary="Поиск" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default AppHeader;
