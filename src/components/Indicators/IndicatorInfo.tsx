import { MoreVert } from "@mui/icons-material";
import { Card, IconButton, Stack, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import CircleBackdropLoader from "components/Loaders/CircleBackdropLoader";
import { bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import { useGetOrganizationIndicatorsDataByYearQuery } from "services/api/indicators.service";
import { useGetOrganizationQuery } from "services/api/organizations.service";
import { getCookie } from "typescript-cookie";
import IndicatorMenu from "./IndicatorMenu";

const IndicatorInfo = ({ organizationId, year, targetRef }: { organizationId: string; year: string; targetRef: React.MutableRefObject<any> }) => {
  const { data, isLoading, isSuccess } = useGetOrganizationIndicatorsDataByYearQuery({ organizationId, year });
  const { data: orgData, isLoading: orgLoading, isSuccess: orgSuccess } = useGetOrganizationQuery(organizationId);
  const popupState = usePopupState({
    variant: "popover",
    popupId: "indicatorPopup",
  });

  if (isLoading && orgLoading) return <CircleBackdropLoader open={isLoading} />;

  if (isSuccess && data && orgSuccess && orgData) {
    return (
      <div ref={targetRef}>
        <Stack spacing={1}>
          <Card elevation={4} sx={{ height: "fit-content" }}>
            <Stack margin={2} spacing={2}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant="h4">
                  {orgData.orgName} УНП:{orgData.regNum} Год:{year}
                </Typography>
                {getCookie("userId") === data.applicationUserId ? (
                  <>
                    <IconButton {...bindTrigger(popupState)}>
                      <MoreVert />
                    </IconButton>
                    <IndicatorMenu popupState={popupState} organizationId={organizationId} year={year} />
                  </>
                ) : null}
              </Stack>
              <Stack>
                <Typography variant="h5">Показатели ликвидности</Typography>
              </Stack>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Текущая ликвидность</TableCell>
                    <TableCell>{data.liquidityIndicators.currentLiquidity}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Быстрая ликвидность</TableCell>
                    <TableCell>{data.liquidityIndicators.fastLiquidity}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Свободный денежный поток</TableCell>
                    <TableCell>{data.liquidityIndicators.freeCashFlow}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Оборачиваемость краткосрочной дебиторской задолженности</TableCell>
                    <TableCell>{data.liquidityIndicators.accountsRecTurnover}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Оборачиваемость запасов</TableCell>
                    <TableCell>{data.liquidityIndicators.reservesTurnover}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Оборачиваемость краткосрочной кредиторской задолженности</TableCell>
                    <TableCell>{data.liquidityIndicators.accountsPayTurnover}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Финансовый цикл текущего года</TableCell>
                    <TableCell>{data.liquidityIndicators.financialCycle}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Stack>
            <Stack margin={2} spacing={2}>
              <Typography variant="h5">Показатели финансовой устойчивости</Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Коэффициент финансового левереджа</TableCell>
                    <TableCell>{data.financialIndicators.leverage}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Коэффициент покрытия процентных выплат</TableCell>
                    <TableCell>{data.financialIndicators.coverageRatio}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Stack>
            <Stack margin={2} spacing={2}>
              <Typography variant="h5">Показатели прибыльности</Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Рентабельность активов</TableCell>
                    <TableCell>{data.profitabilityIndicators.returnOnAssets}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Рентабельность собственного капитала</TableCell>
                    <TableCell>{data.profitabilityIndicators.returnOnEquity}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Рентабельность инвестиций</TableCell>
                    <TableCell>{data.profitabilityIndicators.returnOnInvestment}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Stack>
          </Card>
        </Stack>
      </div>
    );
  }

  return null;
};

export default IndicatorInfo;
