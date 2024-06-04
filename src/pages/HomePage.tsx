import { Card, Container, Stack, Typography, styled } from "@mui/material";
import { useGetMeQuery } from "services/api/user.service";
import { getCookie } from "typescript-cookie";

const HomePageContainer = styled(Container)(({ theme }) => ({
  height: "100svh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const HomePage = () => {
  return (
    <HomePageContainer>
      <Card>
        <Stack direction={"column"} margin={1} spacing={1}>
          <Stack spacing={2} margin={2} direction={"row"} justifyContent={"space-between"}>
            <Typography>Тут должна быть очень полезная информация о том как этим пользовотся</Typography>
          </Stack>
        </Stack>
      </Card>
    </HomePageContainer>
  );
};

export default HomePage;
