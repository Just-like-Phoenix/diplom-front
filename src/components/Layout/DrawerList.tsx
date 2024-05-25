import { Domain, Home, Search } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

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
  );
};

export default DrawerList;
