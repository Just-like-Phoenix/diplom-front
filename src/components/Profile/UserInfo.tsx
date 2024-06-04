import { MoreVert } from "@mui/icons-material";
import { Button, Card, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserInfoData } from "types/UserInfoData";
import { getCookie } from "typescript-cookie";
import ProfileMenu from "./ProfileMenu";
import { bindTrigger, usePopupState } from "material-ui-popup-state/hooks";

const UserInfo = (props: UserInfoData) => {
  const popupState = usePopupState({
    variant: "popover",
    popupId: "profilePopup",
  });
  return (
    <Card elevation={4}>
      <Stack margin={2} spacing={2}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h5">Личные данные</Typography>
          {getCookie("userId") === props.id ? (
            <>
              <IconButton {...bindTrigger(popupState)}>
                <MoreVert />
              </IconButton>
              <ProfileMenu popupState={popupState} />
            </>
          ) : null}
        </Stack>
        <Stack direction={"column"} spacing={2}>
          <Stack>
            <Typography variant="overline">Email</Typography>
            <Typography>{props.email}</Typography>
          </Stack>

          <Stack>
            <Typography variant="overline">Ник</Typography>
            <Typography>{props.userName}</Typography>
          </Stack>
        </Stack>

        <Stack direction={"row"} spacing={2}>
          <Stack>
            <Typography variant="overline">Фамилия</Typography>
            <Typography>{props.lastName}</Typography>
          </Stack>

          <Stack>
            <Typography variant="overline">Имя</Typography>
            <Typography>{props.firstName}</Typography>
          </Stack>

          <Stack>
            <Typography variant="overline">Отчество</Typography>
            <Typography>{props.middleName}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default UserInfo;
