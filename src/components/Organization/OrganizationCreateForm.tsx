import { Button, Card, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { orgRegions } from "assets/ConstData/OrgRegions";
import { orgTypes } from "assets/ConstData/OrgTypes";
import CircleBackdropLoader from "components/Loaders/CircleBackdropLoader";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePostOrganizationsMutation } from "services/api/organizations.service";
import { OrganizationCreateData } from "types/OrganizationCreateData";

const OrganizationCreateForm = () => {
  const [formStep, setFormStep] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<OrganizationCreateData>({
    mode: "all",
    defaultValues: { orgType: orgTypes[0], orgRegion: orgRegions[0] },
  });
  const navigate = useNavigate();
  const [sendRequest, { isSuccess, isLoading }] = usePostOrganizationsMutation();
  const [orgType, setOrgType] = useState("");
  const [orgRegion, setOrgRegion] = useState("");
  const onSubmit = (data: OrganizationCreateData) => sendRequest(data);

  useEffect(() => {
    if (isSuccess) {
      navigate("/me/organizations");
    }
  }, [isSuccess]);

  if (isLoading) return <CircleBackdropLoader open={isLoading} />;

  return (
    <Card elevation={4} sx={{ width: 360, margin: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} margin={2}>
          <Typography align="center" variant="h5">
            Создание организации
          </Typography>

          {formStep >= 0 && (
            <Stack spacing={2} display={formStep === 0 ? "flex" : "none"}>
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
                label="УНП"
                type="number"
                onInput={(e) => {
                  var InputElement = e.target as HTMLInputElement;
                  var parsedValue = parseInt(InputElement.value);
                  if (!isNaN(parsedValue)) {
                    InputElement.value = Math.max(0, parsedValue).toString().slice(0, 9);
                  }
                }}
                variant="outlined"
                error={!!errors.regNum}
                helperText={errors.regNum?.message}
                {...register("regNum", {
                  required: { value: true, message: "Ввeдите УНП!" },
                  minLength: {
                    value: 9,
                    message: "УНП должен состоять из 9 цифр!",
                  },
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
            </Stack>
          )}

          {formStep >= 1 && (
            <Stack spacing={2} display={formStep === 1 ? "flex" : "none"}>
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
            </Stack>
          )}
          <Stack direction={"row"} justifyContent={"flex-end"} sx={{ display: formStep === 0 ? "flex" : "none" }}>
            <Button variant="contained" disabled={!isValid} onClick={(e) => setFormStep(formStep + 1)}>
              Далее
            </Button>
          </Stack>
          <Stack direction={"row"} justifyContent={"flex-end"} sx={{ display: formStep === 1 ? "flex" : "none" }}>
            <Button variant="contained" disabled={!isValid} type="submit">
              Создать
            </Button>
          </Stack>
        </Stack>
      </form>
    </Card>
  );
};

export default OrganizationCreateForm;
