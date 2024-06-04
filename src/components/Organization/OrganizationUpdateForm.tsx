import {
  Button,
  Card,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { orgRegions } from "assets/ConstData/OrgRegions";
import { orgTypes } from "assets/ConstData/OrgTypes";
import CircleBackdropLoader from "components/Loaders/CircleBackdropLoader";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrganizationQuery, usePutOrganizationMutation } from "services/api/organizations.service";
import { OrganizationUpdateRequest } from "types/OrganizationUpdateRequest";

const OrganizationUpdateContainer = styled(Container)(({ theme }) => ({
  height: "100svh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const OrganizationUpdateForm = ({ organizationId }: { organizationId: string }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<OrganizationUpdateRequest>({
    mode: "all",
    defaultValues: { orgType: orgTypes[0], orgRegion: orgRegions[0] },
  });
  const navigate = useNavigate();
  const [sendRequest, { isSuccess, isLoading }] = usePutOrganizationMutation();
  const { data, isSuccess: orgSuccess, isLoading: orgLoading } = useGetOrganizationQuery(organizationId);
  const [orgType, setOrgType] = useState("");
  const [orgRegion, setOrgRegion] = useState("");
  const onSubmit = (data: OrganizationUpdateRequest) => {
    sendRequest({ organizationId, data });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/organizations/${organizationId}`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (orgSuccess) {
      setValue("orgAddress", data.orgAddress);
      setValue("orgEmail", data.orgEmail);
      setValue("orgName", data.orgName);
      setValue("orgRegion", data.orgRegion);
      setValue("orgType", data.orgType);
      setOrgRegion(data.orgRegion);
      setOrgType(data.orgType);
    }
  }, [orgSuccess]);

  return (
    <Card elevation={4} sx={{ width: 360, margin: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} margin={2}>
          <Typography align="center" variant="h5">
            Изменение организации
          </Typography>

          <TextField
            label="Название"
            type="text"
            variant="outlined"
            error={!!errors.orgName}
            helperText={errors.orgName?.message}
            {...register("orgName", {
              required: { value: true, message: "Ввeдите название!" },
            })}
          />
          <TextField
            select
            label="Вид деятельности"
            type="text"
            variant="outlined"
            value={orgType}
            onChange={(e) => {
              setOrgType(e.target.value);
            }}
            error={!!errors.orgType}
            helperText={errors.orgType?.message}
            inputProps={register("orgType", {
              required: {
                value: true,
                message: "Выбирите вид деятельности!",
              },
            })}
          >
            {orgTypes.map((orgType) => {
              return (
                <MenuItem key={orgType} value={orgType}>
                  {orgType}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            error={!!errors.orgEmail}
            helperText={errors.orgEmail?.message}
            {...register("orgEmail", {
              required: { value: true, message: "Ввeдите Email!" },
              pattern: {
                value:
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                message: "Введите email в формате name@example.com",
              },
            })}
          />
          <TextField
            select
            label="Область"
            type="text"
            variant="outlined"
            value={orgRegion}
            onChange={(e) => {
              setOrgRegion(e.target.value);
            }}
            error={!!errors.orgRegion}
            helperText={errors.orgRegion?.message}
            inputProps={register("orgRegion", {
              required: { value: true, message: "Ввeдите область!" },
            })}
          >
            {orgRegions.map((orgRegion) => {
              return (
                <MenuItem key={orgRegion} value={orgRegion}>
                  {orgRegion}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            label="Адрес"
            type="text"
            variant="outlined"
            error={!!errors.orgAddress}
            helperText={errors.orgAddress?.message}
            {...register("orgAddress", {
              required: { value: true, message: "Ввeдите адрес!" },
            })}
          />
          <Button variant="contained" disabled={!isValid} type="submit">
            Изменить
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default OrganizationUpdateForm;
