import styled from "@emotion/styled";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundContainer = styled(Container)(({ theme }) => ({
  height: "100svh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const NotFoundPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <NotFoundContainer>
      <Stack spacing={2}>
        <Typography
          align="center"
          variant="h2"
          color={theme.palette.text.primary}
        >
          Страница не найдена
        </Typography>
        <Button fullWidth variant="contained" onClick={(e) => navigate("/")}>
          Вернутся на главную
        </Button>
      </Stack>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
