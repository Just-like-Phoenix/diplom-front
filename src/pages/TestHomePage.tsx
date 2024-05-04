import { Grid3x3 } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Card,
  Container,
  Drawer,
  Toolbar,
} from "@mui/material";
import AppHeader from "components/AppBar/AppHeader";

import { useNavigate } from "react-router-dom";

const TestHomePage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ height: "100svh", marginLeft: "224px", marginRight: "224px" }}>
      <AppHeader />
      <Toolbar />
      <Box>
        <Button onClick={(e) => navigate("/signin")}>SignIn</Button>
        <Button onClick={(e) => navigate("/signup")}>SignUp</Button>
      </Box>
    </Box>
  );
};

export default TestHomePage;
