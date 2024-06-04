import { Delete, Update } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { PopupState, bindMenu } from "material-ui-popup-state/hooks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userOrganizationsApi } from "services/api/organizations.service";
import { useDeleteMeMutation, userApi } from "services/api/user.service";
import { removeCookie } from "typescript-cookie";

const ProfileMenu = ({ popupState }: { popupState: PopupState }) => {
  const [deleteRequest, {}] = useDeleteMeMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Menu
      id="profile-menu"
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
          navigate("/me/update");
          popupState.close();
        }}
      >
        <ListItemIcon>
          <Update color="warning" />
        </ListItemIcon>
        Изменить
      </MenuItem>
      <MenuItem
        onClick={(e) => {
          deleteRequest();
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
          <Delete color="error" />
        </ListItemIcon>
        Удалить
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
