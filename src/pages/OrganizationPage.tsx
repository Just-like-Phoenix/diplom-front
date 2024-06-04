import { Container, Stack, Typography, useTheme } from "@mui/material";
import OrganizationInfo from "components/Organization/OrganizationInfo";
import { useParams } from "react-router-dom";

const OrganizationPage = () => {
  const theme = useTheme();
  const { organizationId } = useParams();

  if (organizationId) {
    return (
      <Container>
        <Stack direction={"column"} margin={1} spacing={1}>
          <Stack spacing={2} margin={2} direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h3" color={theme.palette.text.primary}>
              Информация о организации
            </Typography>
          </Stack>
          <OrganizationInfo organizationId={organizationId} />
        </Stack>
      </Container>
    );
  }

  return null;
};

export default OrganizationPage;
