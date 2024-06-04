import { Business, Group, Home, ShowChart, Store } from "@mui/icons-material";
import { List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";

const DrawerList = () => {
  const navigate = useNavigate();
  return (
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
          <Business fontSize="medium" />
        </ListItemIcon>
        <ListItemText primary="Организации" />
      </ListItemButton>
      {getCookie("isSignin") ? (
        <ListItemButton onClick={(e) => navigate("/me/organizations")}>
          <ListItemIcon>
            <Store fontSize="medium" />
          </ListItemIcon>
          <ListItemText primary="Мои организации" />
        </ListItemButton>
      ) : null}
      {getCookie("role")?.split(",").includes("Administrator") ? (
        <ListItemButton onClick={(e) => navigate("/users")}>
          <ListItemIcon>
            <Group fontSize="medium" />
          </ListItemIcon>
          <ListItemText primary="Пользователи" />
        </ListItemButton>
      ) : null}
      {/* {getCookie("role")?.split(",").includes("Administrator") ? (
        <ListItemButton onClick={(e) => navigate("/stats")}>
          <ListItemIcon>
            <ShowChart fontSize="medium" />
          </ListItemIcon>
          <ListItemText primary="Статистика" />
        </ListItemButton>
      ) : null} */}
    </List>
  );
};

export default DrawerList;
