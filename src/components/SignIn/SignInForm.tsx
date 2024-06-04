import {
  Button,
  Card,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSignInMutation } from "services/api/authorization.service";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SignInData } from "types/SignInData";
import CircleBackdropLoader from "components/Loaders/CircleBackdropLoader";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { setCookie } from "typescript-cookie";
import { jwtDecode } from "jwt-decode";
import { JwtCustomPayload } from "types/JwtCustomPayload";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { enqueueSnackbar } from "notistack";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({ mode: "all" });
  const navigate = useNavigate();
  const [sendRequest, { isSuccess, isLoading, data, status }] = useSignInMutation();
  const onSubmit = (data: SignInData) => {
    sendRequest(data);
  };

  useEffect(() => {
    if (isSuccess && data) {
      const decoded = jwtDecode(data.token) as JwtCustomPayload;
      setCookie("type", data.type, { expires: 30, path: "" });
      setCookie("token", data.token, { expires: 30, path: "" });
      setCookie("email", decoded.email, { expires: 30, path: "" });
      setCookie("userId", decoded.nameid, { expires: 30, path: "" });
      setCookie(`role`, decoded.role.toString(), { expires: 30, path: "" });
      setCookie("isSignin", true, { expires: 30, path: "" });
      navigate("/");
    }
  }, [isSuccess, data]);

  if (isLoading) return <CircleBackdropLoader open={isLoading} />;

  if (status == QueryStatus.rejected) enqueueSnackbar("Не удолось войти!", { variant: "error" });

  return (
    <Card elevation={4} sx={{ width: 360, margin: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} margin={2}>
          <Typography align="center" variant="h5">
            Вход
          </Typography>
          <TextField
            label="Email"
            type="text"
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
          <FormControl variant="outlined" error={!!errors.password}>
            <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
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
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                    }}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Пароль"
            />
            <FormHelperText>{errors.password?.message}</FormHelperText>
          </FormControl>
          <Stack spacing={2} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Button variant="text" onClick={(e) => navigate("/signup")}>
              Создать аккаунт
            </Button>
            <Button variant="contained" type="submit">
              Войти
            </Button>
          </Stack>
        </Stack>
      </form>
    </Card>
  );
};

export default SignInForm;
