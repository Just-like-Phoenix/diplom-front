import { useState } from "react";
import { IndicatorsResponse } from "types/IndicatorsResponse";
import IndicatorCard from "./IndicatorCard";
import { Pagination, Stack } from "@mui/material";
import usePagination from "hooks/usePagination";

const Indicators = ({ indicators }: { indicators: IndicatorsResponse[] }) => {
  let [page, setPage] = useState(1);
  const perPage = 5;

  const count = Math.ceil(indicators.length / perPage);
  const data = usePagination(indicators, perPage);

  return (
    <Stack spacing={1}>
      {data.currentData().map((e: IndicatorsResponse) => (
        <IndicatorCard key={e.year} year={e.year} />
      ))}
      {count > 1 ? (
        <Stack display={"flex"} alignItems={"center"}>
          <Pagination
            count={count}
            size="large"
            page={page}
            variant="outlined"
            onChange={(e, p) => {
              setPage(p);
              data.jump(p);
            }}
          />
        </Stack>
      ) : null}
    </Stack>
  );
};

export default Indicators;
