import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import CircleBackdropLoader from "components/Loaders/CircleBackdropLoader";
import { useGetOrganizationQuery } from "services/api/organizations.service";
import { getCookie } from "typescript-cookie";
import OrganizationIndicators from "./OrganizationIndicators";
import { ExpandMore, MoreVert } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetOrganizationIndicatorsDataQuery } from "services/api/indicators.service";
import IndicatorChart from "components/Indicators/IndicatorChart";
import { Margin, Resolution, usePDF } from "react-to-pdf";
import OrganizationMenu from "./OrganizationMenu";
import { bindTrigger, usePopupState } from "material-ui-popup-state/hooks";

const OrganizationInfo = ({ organizationId }: { organizationId: string }) => {
  const { data, isLoading, isSuccess } = useGetOrganizationQuery(organizationId);
  const {
    data: indicatorsData,
    isLoading: indicatorsLoading,
    isSuccess: indicatorsSuccess,
  } = useGetOrganizationIndicatorsDataQuery(organizationId, { refetchOnMountOrArgChange: true });
  const [chartVariant, setChartVariant] = useState<string>("currentLiquidity");
  const navigate = useNavigate();
  const theme = useTheme();
  const { toPDF, targetRef } = usePDF({
    filename: `Отчет ${chartVariant} ${data?.orgName}`,
    resolution: Resolution.NORMAL,
    page: { margin: Margin.LARGE },
    method: "save",
  });
  const popupState = usePopupState({
    variant: "popover",
    popupId: "organizationPopup",
  });

  if (isLoading && indicatorsLoading) return <CircleBackdropLoader open={isLoading} />;

  if (isSuccess && data && indicatorsSuccess && indicatorsData) {
    return (
      <Stack spacing={1}>
        <Card elevation={4}>
          <Stack margin={2} spacing={2}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography variant="h5">{data.orgName}</Typography>
              {getCookie("userId") === data.applicationUserId ? (
                <>
                  <IconButton {...bindTrigger(popupState)}>
                    <MoreVert />
                  </IconButton>
                  <OrganizationMenu popupState={popupState} organizationId={organizationId} />
                </>
              ) : null}
            </Stack>

            <Stack>
              <Typography variant="overline">УНП</Typography>
              <Typography>{data.regNum}</Typography>
            </Stack>

            <Stack>
              <Typography variant="overline">Email</Typography>
              <Typography>{data.orgEmail}</Typography>
            </Stack>

            <Stack direction={"row"} spacing={2}>
              <Stack>
                <Typography variant="overline">Область</Typography>
                <Typography>{data.orgRegion}</Typography>
              </Stack>
              <Stack>
                <Typography variant="overline">Адрес</Typography>
                <Typography>{data.orgAddress}</Typography>
              </Stack>
            </Stack>

            <Stack>
              <Typography variant="overline">Вид деятельности</Typography>
              <Typography>{data.orgType}</Typography>
            </Stack>
          </Stack>
        </Card>
        <Stack>
          <Accordion elevation={4}>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1-content" id="panel1-header">
              <Stack direction={"row"} justifyContent={"space-between"} width={"100%"}>
                <Typography variant="h4" color={theme.palette.text.primary}>
                  Отчеты
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionActions>
              {getCookie("userId") === data.applicationUserId ? (
                <Button
                  variant="contained"
                  onClick={(e) => {
                    navigate(`/organizations/${organizationId}/indicators/create`);
                  }}
                >
                  Добавить
                </Button>
              ) : null}
            </AccordionActions>
            <AccordionDetails>
              <Stack spacing={2}>
                <OrganizationIndicators organizationId={organizationId} />
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion elevation={4}>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1-content" id="panel1-header">
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant="h4" color={theme.palette.text.primary}>
                  Графики
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionActions>
              {indicatorsData.length > 1 ? (
                <Button variant="contained" onClick={(e) => toPDF()}>
                  Экспорт
                </Button>
              ) : (
                <></>
              )}
            </AccordionActions>
            <AccordionDetails>
              <Tabs
                value={chartVariant}
                onChange={(event: React.SyntheticEvent, newValue: string) => setChartVariant(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ width: "100%" }}
              >
                <Tab value="currentLiquidity" label="Текущая ликвидность" />
                <Tab value="fastLiquidity" label="Быстрая ликвидность" />
                <Tab value="freeCashFlow" label="Свободный денежный поток" />
                <Tab value="accountsRecTurnover" label="Оборачиваемость краткосрочной дебиторской задолженности" />
                <Tab value="reservesTurnover" label="Оборачиваемость запасов" />
                <Tab value="accountsPayTurnover" label="Оборачиваемость краткосрочной кредиторской задолженности" />
                <Tab value="financialCycle" label="Финансовый цикл текущего года" />
                <Tab value="leverage" label="Коэффициент финансового левереджа" />
                <Tab value="coverageRatio" label="Коэффициент покрытия процентных выплат" />
                <Tab value="returnOnAssets" label="Рентабельность активов" />
                <Tab value="returnOnEquity" label="Рентабельность собственного капитала" />
                <Tab value="returnOnInvestment" label="Рентабельность инвестиций" />
              </Tabs>
              <IndicatorChart indicatorsData={indicatorsData} chartVariant={chartVariant} targetRef={targetRef} />
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Stack>
    );
  }

  return null;
};

export default OrganizationInfo;
