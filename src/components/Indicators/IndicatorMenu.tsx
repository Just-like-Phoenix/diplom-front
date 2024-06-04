import { Delete, Update } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { PopupState, bindMenu } from "material-ui-popup-state/hooks";
import { useNavigate } from "react-router-dom";
import { useDeleteOrganizationIndicatorsDataByYearMutation } from "services/api/indicators.service";

const IndicatorMenu = ({ popupState, organizationId, year }: { popupState: PopupState; organizationId: string; year: string }) => {
  const [sendRequest, { isSuccess, isLoading }] = useDeleteOrganizationIndicatorsDataByYearMutation();
  const navigate = useNavigate();

  return (
    <Menu
      id="indicator-menu"
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
          navigate(`/organizations/${organizationId}/indicators/${year}/update`);
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
          sendRequest({ organizationId, year });
          navigate(`/organizations/${organizationId}`);
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

export default IndicatorMenu;
