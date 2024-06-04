export interface IndicatorsDataResponse {
  year: number;
  organizationIndicatorsId: string;
  organizationId: string;
  applicationUserId: string;
  liquidityIndicators: {
    currentLiquidity: number;
    fastLiquidity: number;
    freeCashFlow: number;
    accountsRecTurnover: number;
    reservesTurnover: number;
    accountsPayTurnover: number;
    financialCycle: number;
  };
  financialIndicators: {
    leverage: number;
    coverageRatio: number;
  };
  profitabilityIndicators: {
    returnOnAssets: number;
    returnOnEquity: number;
    returnOnInvestment: number;
  };
}
