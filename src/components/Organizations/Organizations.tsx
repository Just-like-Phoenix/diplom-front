import usePagination from "hooks/usePagination";
import { useState } from "react";
import { OrganizationResponse } from "types/OrganizationResponse";
import OrganizationCard from "./OrganizationCard";
import { Pagination, Stack } from "@mui/material";

const Organizations = ({
  organizations,
}: {
  organizations: OrganizationResponse[];
}) => {
  let [page, setPage] = useState(1);
  const perPage = 5;

  const count = Math.ceil(organizations.length / perPage);
  const data = usePagination(organizations, perPage);

  return (
    <Stack spacing={1}>
      {data.currentData().map((e: OrganizationResponse) => (
        <OrganizationCard
          key={e.organizationId}
          organizationId={e.organizationId}
          regNum={e.regNum}
          orgName={e.orgName}
          orgType={e.orgType}
          orgRegion={e.orgRegion}
        />
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

export default Organizations;
