import { Paper, Stack, Typography, useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { IndicatorsDataResponse } from "types/IndicatorsDataResponse";

function findKey(obj: any, key: string): any {
  let value;
  for (let k in obj) {
    if (k === key) {
      return obj[k];
    }
    if (obj[k] && typeof obj[k] === "object") {
      value = findKey(obj[k], key);
      if (value) {
        return value;
      }
    }
  }
  return value;
}

const IndicatorChart = ({
  indicatorsData,
  chartVariant,
  targetRef,
}: {
  indicatorsData: IndicatorsDataResponse[];
  chartVariant: string;
  targetRef: React.MutableRefObject<any>;
}) => {
  const [xAxis, setXAxis] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const theme = useTheme();

  useEffect(() => {
    setXAxis(
      indicatorsData.map((e) => {
        return e.year.toString();
      })
    );
    setData(
      indicatorsData.map((e) => {
        return findKey(e, chartVariant);
      })
    );
  }, [chartVariant]);

  return (
    <div ref={targetRef}>
      <Paper elevation={4}>
        {xAxis.length > 1 ? (
          <LineChart
            xAxis={[{ data: xAxis, valueFormatter: (value) => value.toString(), tickMinStep: 1 }]}
            series={[
              {
                data: data,
                color: theme.palette.primary.main,
              },
            ]}
            grid={{ vertical: true, horizontal: true }}
            height={500}
          />
        ) : (
          <Stack alignItems={"center"}>
            <Typography variant="h4">Для построения недостаточно данных</Typography>
          </Stack>
        )}
      </Paper>
    </div>
  );
};

export default IndicatorChart;
