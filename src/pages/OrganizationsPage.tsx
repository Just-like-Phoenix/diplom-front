import { Button, Card, Container, Stack, TextField, Typography, useTheme } from "@mui/material";
import CircleBackdropLoader from "components/Loaders/CircleBackdropLoader";
import OrganizationCard from "components/Organizations/OrganizationCard";
import Organizations from "components/Organizations/Organizations";
import { useState } from "react";
import { useGetOrganizationsQuery } from "services/api/organizations.service";

const OrganizationsPage = () => {
  const [searchString, setSearchString] = useState("");
  const { data, isLoading } = useGetOrganizationsQuery(searchString, { refetchOnMountOrArgChange: true });
  const theme = useTheme();

  if (isLoading) return <CircleBackdropLoader open={isLoading} />;

  return (
    <Container>
      <Stack direction={"column"} margin={1} spacing={1}>
        <Stack spacing={2} margin={2} direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h3" color={theme.palette.text.primary}>
            Организации
          </Typography>
        </Stack>

        <Card elevation={4} sx={{ margin: 2, width: "100%" }}>
          <Stack spacing={2} margin={2} direction={"row"}>
            <TextField
              label="Поиск"
              type="text"
              variant="outlined"
              fullWidth
              onChange={(e) => {
                setSearchString(e.target.value);
              }}
            />
          </Stack>
        </Card>

        <Card elevation={4} sx={{ margin: 2, width: "100%" }}>
          <Stack spacing={2} margin={2} direction={"row"} justifyContent={"space-between"}>
            <Stack></Stack>
            <Stack></Stack>
          </Stack>
        </Card>

        {data != null && data?.length !== 0 ? (
          <Organizations organizations={data} />
        ) : (
          <Stack direction={"column"} margin={1} spacing={1}>
            <Card elevation={4} sx={{ margin: 2, width: "100%" }}>
              <Stack spacing={2} margin={2} direction={"row"} justifyContent={"center"}>
                <Typography variant="h4">Таких организаций нет</Typography>
              </Stack>
            </Card>
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

export default OrganizationsPage;
