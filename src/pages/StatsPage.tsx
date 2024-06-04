import { Container, Stack, Tab, Tabs, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "services/api/user.service";
import { getCookie } from "typescript-cookie";

const StatsPage = () => {
  const { data: userData, isLoading } = useGetUsersQuery();
  const [chartVariant, setChartVariant] = useState<string>("currentLiquidity");
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();
  const theme = useTheme();

  if (!getCookie("role")?.split(",").includes("Administrator")) {
    navigate("/");
    return null;
  }
  console.log(userData);
  return (
    <Container>
      <Stack direction={"column"} margin={1} spacing={1}>
        <Tabs
          value={chartVariant}
          onChange={(event: React.SyntheticEvent, newValue: string) => setChartVariant(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ width: "100%" }}
        >
          <Tab value="blockedUsers" label="Статистика блокировок" />
          <Tab value="roleUsers" label="Статистика" />
        </Tabs>
      </Stack>
    </Container>
  );
};

export default StatsPage;
