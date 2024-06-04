import { Button, Card, Container, Stack, TextField, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import CircleBackdropLoader from "components/Loaders/CircleBackdropLoader";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery, usePatchBlockUserMutation, usePatchUnBlockUserMutation } from "services/api/user.service";
import { AdminUserInfoData } from "types/UserInfoData";
import { getCookie } from "typescript-cookie";

const UsersPage = () => {
  const { data, isLoading } = useGetUsersQuery();
  const [sendBlockUser, { isLoading: blockLoading }] = usePatchBlockUserMutation();
  const [sendUnBlockUser, { isLoading: unblockLoading }] = usePatchUnBlockUserMutation();
  const theme = useTheme();
  const navigate = useNavigate();

  const columns = useMemo<GridColDef<AdminUserInfoData>[]>(
    () => [
      { field: "email", headerName: "Email", hideable: false, flex: 1 },
      { field: "userName", headerName: "Ник", hideable: false, flex: 1 },
      { field: "lastName", headerName: "Фамилия", hideable: false, flex: 1 },
      { field: "firstName", headerName: "Имя", hideable: false, flex: 1 },
      { field: "middleName", headerName: "Отчество", hideable: false, flex: 1 },
      {
        field: "block",
        headerName: "Блокировка",
        hideable: false,
        sortable: false,
        filterable: false,
        flex: 1,
        renderCell: (params) => {
          if (getCookie("userId") === params.row.id) return "Это вы";
          if (params.row.roles.includes("Administrator")) return "Администратор";
          return (
            <Button
              variant="contained"
              color={params.row.claims.includes("NotBlocked") ? "error" : "primary"}
              onClick={(e) => {
                params.row.claims.includes("NotBlocked") ? sendBlockUser(params.row.id) : sendUnBlockUser(params.row.id);
              }}
            >
              {params.row.claims.includes("NotBlocked") ? "Заблокировать" : "Разблокировать"}
            </Button>
          );
        },
      },
    ],
    []
  );

  if (!getCookie("role")?.split(",").includes("Administrator")) {
    navigate("/");
    return null;
  }

  if (isLoading && blockLoading && unblockLoading) return <CircleBackdropLoader open={isLoading} />;

  return (
    <Container>
      <Stack direction={"column"} margin={1} spacing={1}>
        <Stack spacing={2} margin={2} direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h3" color={theme.palette.text.primary}>
            Пользователи
          </Typography>
        </Stack>

        {data != null && data?.length !== 0 ? (
          <Card elevation={4} sx={{ margin: 2, width: "100%" }}>
            <DataGrid disableColumnResize disableColumnSelector columns={columns} rows={data} />
          </Card>
        ) : (
          <Stack direction={"column"} margin={1} spacing={1}>
            <Card elevation={4} sx={{ margin: 2, width: "100%" }}>
              <Stack spacing={2} margin={2} direction={"row"} justifyContent={"center"}>
                <Typography variant="h4">Пользователей нет</Typography>
              </Stack>
            </Card>
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

export default UsersPage;
