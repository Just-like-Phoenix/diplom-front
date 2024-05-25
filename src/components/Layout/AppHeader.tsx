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
  );
};

export default AppHeader;
