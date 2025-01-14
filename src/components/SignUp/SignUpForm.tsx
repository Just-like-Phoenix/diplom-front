import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import CircleBackdropLoader from "components/Loaders/CircleBackdropLoader";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "services/api/authorization.service";
import { SignUpRequest } from "types/SignUpData";

interface FormData {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

const SignUpForm = () => {
  const [formStep, setFormStep] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "all" });
  const navigate = useNavigate();
  const [sendRequest, { isSuccess, isLoading }] = useSignUpMutation();

  const onSubmit = (data: SignUpRequest) => sendRequest(data);

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess]);

  if (isLoading) return <CircleBackdropLoader open={isLoading} />;

  return (
    <Card elevation={4} sx={{ width: 360, margin: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} margin={2}>
          <Typography align="center" variant="h5">
            Регистрация
          </Typography>

          {formStep >= 0 && (
            <Stack spacing={2} display={formStep === 0 ? "flex" : "none"}>
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
            </Stack>
          )}

          {formStep >= 1 && (
            <Stack spacing={2} display={formStep === 1 ? "flex" : "none"}>
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
                label="Пароль"
                type="password"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password", {
                  required: { value: true, message: "Ввeдите пароль!" },
                  minLength: {
                    value: 8,
                    message: "Пароль меньше 8 символов!",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                    message: "Пароль должен содержать цифры, латинские прописные и строчные буквы",
                  },
                })}
              />
              <TextField
                label="Подтверждение пароля"
                type="password"
                variant="outlined"
                error={!!errors.passwordConfirm}
                helperText={errors.passwordConfirm?.message}
                {...register("passwordConfirm", {
                  required: { value: true, message: "Ввeдите пароль!" },
                  validate: (value) => value === watch("password") || "Пароль не совподает!",
                })}
              />
            </Stack>
          )}

          <Stack spacing={2} direction={"row"} alignItems={"center"} justifyContent={"end"}>
            <Button
              variant="contained"
              sx={{ display: formStep === 0 ? "flex" : "none" }}
              disabled={!isValid}
              onClick={(e) => setFormStep(formStep + 1)}
            >
              Далее
            </Button>
            <Button variant="contained" sx={{ display: formStep === 1 ? "flex" : "none" }} disabled={!isValid} type="submit">
              Зарегистрироватся
            </Button>
          </Stack>
        </Stack>
      </form>
    </Card>
  );
};

export default SignUpForm;
