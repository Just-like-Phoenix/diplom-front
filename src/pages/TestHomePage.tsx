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

import { useNavigate } from "react-router-dom";

const TestHomePage = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Button onClick={(e) => navigate("/signin")}>SignIn</Button>
      <Button onClick={(e) => navigate("/signup")}>SignUp</Button>
    </Box>
  );
};

export default TestHomePage;
