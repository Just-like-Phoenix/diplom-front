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
import { SignInRequest } from "types/SignInData";
import CircleBackdropLoader from "components/Loaders/CircleBackdropLoader";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface FormData {
  email: string;
  password: string;
}

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const [sendRequest, { isSuccess, isLoading }] = useSignInMutation();

  const onSubmit = (data: SignInRequest) => sendRequest(data);

  if (isLoading) return <CircleBackdropLoader open={isLoading} />;

  if (isSuccess) navigate("/");

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
            <InputLabel htmlFor="outlined-adornment-password">
              Пароль
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: { value: true, message: "Ввeдите пароль!" },
                minLength: { value: 8, message: "Ввeдите пароль!" },
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
          <Stack
            spacing={2}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
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
