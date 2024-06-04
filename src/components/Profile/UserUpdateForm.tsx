import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGetMeQuery, usePutMeMutation } from "services/api/user.service";
import { UserUpdateRequest } from "types/UserUpdateRequest";

const UserUpdateForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<UserUpdateRequest>({
    mode: "all",
  });
  const navigate = useNavigate();
  const [sendRequest, { isSuccess }] = usePutMeMutation();
  const { data, isSuccess: userSuccess } = useGetMeQuery();
  const onSubmit = (data: UserUpdateRequest) => {
    sendRequest(data);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (userSuccess) {
      setValue("email", data.email);
      setValue("userName", data.userName);
      setValue("firstName", data.firstName);
      setValue("lastName", data.lastName);
      setValue("middleName", data.middleName);
    }
  }, [userSuccess]);

  return (
    <Card elevation={4} sx={{ width: 360, margin: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} margin={2}>
          <Typography align="center" variant="h5">
            Изменение пользователя
          </Typography>

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email", {
              required: { value: true, message: "Ввeдите Email!" },
              pattern: {
                value:
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                message: "Введите email в формате name@example.com",
              },
            })}
          />
          <TextField
            label="Ник"
            type="text"
            variant="outlined"
            error={!!errors.userName}
            helperText={errors.userName?.message}
            {...register("userName", {
              required: { value: true, message: "Ввeдите фамилию!" },
            })}
          />
          <TextField
            label="Фамилия"
            type="text"
            variant="outlined"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            {...register("lastName", {
              required: { value: true, message: "Ввeдите фамилию!" },
            })}
          />
          <TextField
            label="Имя"
            type="text"
            variant="outlined"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            {...register("firstName", {
              required: { value: true, message: "Ввeдите имя!" },
            })}
          />
          <TextField
            label="Отчество"
            type="text"
            variant="outlined"
            error={!!errors.middleName}
            helperText={errors.middleName?.message}
            {...register("middleName", {
              required: { value: true, message: "Ввeдите отчество!" },
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

export default UserUpdateForm;
