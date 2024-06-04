import { KeyboardArrowDown } from "@mui/icons-material";
import { AppBar, Button, Toolbar, styled } from "@mui/material";
import { bindTrigger } from "material-ui-popup-state";
import { usePopupState } from "material-ui-popup-state/hooks";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { getCookie } from "typescript-cookie";

const ProfileButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const AppHeader = () => {
  const navigate = useNavigate();
  const popupState = usePopupState({
    variant: "popover",
    popupId: "headerPopup",
  });

  return (
    <AppBar elevation={4} color="default">
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          sx={{
            display: getCookie("isSignin") ? "none" : "flex",
          }}
          onClick={(e) => navigate("/signin")}
        >
          Войти
        </Button>
        <ProfileButton
          variant="text"
          {...bindTrigger(popupState)}
          sx={{
            display: getCookie("isSignin") ? "flex" : "none",
          }}
          endIcon={<KeyboardArrowDown />}
        >
          {getCookie("email")}
        </ProfileButton>
        <ProfileMenu popupState={popupState} />
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
