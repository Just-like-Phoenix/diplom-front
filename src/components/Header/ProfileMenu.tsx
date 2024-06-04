import { Logout, Person } from "@mui/icons-material";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { PopupState, bindMenu } from "material-ui-popup-state/hooks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userOrganizationsApi } from "services/api/organizations.service";
import { userApi } from "services/api/user.service";
import { removeCookie } from "typescript-cookie";

const ProfileMenu = ({ popupState }: { popupState: PopupState }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Menu
      id="header-menu"
      elevation={16}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      {...bindMenu(popupState)}
    >
      <MenuItem
        onClick={(e) => {
          navigate("/me");
          popupState.close();
        }}
      >
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        Профиль
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={(e) => {
          removeCookie("token");
          removeCookie("type");
          removeCookie("email");
          removeCookie("userId");
          removeCookie("role");
          removeCookie("isSignin");
          dispatch(userApi.util.resetApiState());
          dispatch(userOrganizationsApi.util.resetApiState());
          popupState.close();
          navigate("/");
        }}
      >
        <ListItemIcon>
          <Logout color="error" />
        </ListItemIcon>
        Выйти
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
