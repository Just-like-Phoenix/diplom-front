import { Delete, Update } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { PopupState, bindMenu } from "material-ui-popup-state/hooks";
import { useNavigate } from "react-router-dom";
import { useDeleteOrganizationMutation } from "services/api/organizations.service";

const OrganizationMenu = ({ popupState, organizationId }: { popupState: PopupState; organizationId: string }) => {
  const [sendRequest, { isSuccess, isLoading }] = useDeleteOrganizationMutation();
  const navigate = useNavigate();
  return (
    <Menu
      id="organization-menu"
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
          navigate(`/organizations/${organizationId}/update`);
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
          sendRequest(organizationId);
          navigate(`/me/organizations`);
          popupState.close();
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

export default OrganizationMenu;
