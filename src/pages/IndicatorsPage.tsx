import { Button, Container, Stack, Typography, useTheme } from "@mui/material";
import IndicatorInfo from "components/Indicators/IndicatorInfo";
import { useParams } from "react-router-dom";
import { Margin, Resolution, usePDF } from "react-to-pdf";

const IndicatorsPage = () => {
  const theme = useTheme();
  const { organizationId, year } = useParams();
  const { toPDF, targetRef } = usePDF({
    filename: `Отчет ${year}`,
    resolution: Resolution.NORMAL,
    page: { margin: Margin.LARGE },
    method: "save",
  });

  if (organizationId && year) {
    return (
      <Container>
        <Stack direction={"column"} margin={1} spacing={1}>
          <Stack spacing={2} margin={2} direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h3" color={theme.palette.text.primary}>
              Отчет
            </Typography>
            <Button variant="contained" onClick={() => toPDF()}>
              Экспорт
            </Button>
          </Stack>
          <IndicatorInfo organizationId={organizationId} year={year} targetRef={targetRef} />
        </Stack>
      </Container>
    );
  }

  return null;
};

export default IndicatorsPage;
