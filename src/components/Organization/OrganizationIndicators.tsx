import { Button, Card, Stack, Typography, useTheme } from "@mui/material";
import Indicators from "components/Indicators/Indicators";
import CircleBackdropLoader from "components/Loaders/CircleBackdropLoader";
import { useGetOrganizationIndicatorsQuery } from "services/api/indicators.service";

const OrganizationIndicators = ({ organizationId }: { organizationId: string }) => {
  const { data, isLoading, isSuccess } = useGetOrganizationIndicatorsQuery(organizationId);

  if (isLoading) return <CircleBackdropLoader open={isLoading} />;

  if (isSuccess && data) {
    return (
      <Stack spacing={1}>
        <Indicators indicators={data} />
      </Stack>
    );
  }

  return null;
};

export default OrganizationIndicators;
