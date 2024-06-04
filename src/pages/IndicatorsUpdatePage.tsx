import { Button, Card, Container, Stack, TextField, Typography, styled } from "@mui/material";
import CircleBackdropLoader from "components/Loaders/CircleBackdropLoader";
import { MuiFileInput } from "mui-file-input";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { usePostOrganizationIndicatorsMutation, usePutOrganizationIndicatorsDataByYearMutation } from "services/api/indicators.service";
import { IndicatorsCreateData } from "types/IndicatorsCreateData";
import { IndicatorsUpdateRequest } from "types/IndicatorsUpdateRequest";

const convertBase64 = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result as unknown as string);
    };
  });
};

interface FormData {
  year: number;
  balanceFile: File;
  profitNLossFile: File;
  cashFlowFile: File;
}

const IndicatorsUpdateContainer = styled(Container)(({ theme }) => ({
  height: "100svh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const IndicatorsUpdatePage = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "all",
  });
  const navigate = useNavigate();
  const [sendRequest, { isSuccess, isLoading }] = usePutOrganizationIndicatorsDataByYearMutation();
  const { organizationId, year } = useParams();

  const onSubmit = async (formData: FormData) => {
    const b64balance = await convertBase64(formData.balanceFile);
    const b64cashFlow = await convertBase64(formData.cashFlowFile);
    const b64profitNLoss = await convertBase64(formData.profitNLossFile);

    const data: IndicatorsUpdateRequest = { balanceFile: b64balance, cashFlowFile: b64cashFlow, profitNLossFile: b64profitNLoss };

    if (organizationId && year) sendRequest({ organizationId, year, data });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/organizations/${organizationId}/`);
    }
  }, [isSuccess]);

  if (isLoading) return <CircleBackdropLoader open={isLoading} />;

  return (
    <IndicatorsUpdateContainer>
      <Card elevation={4} sx={{ width: 360, margin: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} margin={2}>
            <Typography align="center" variant="h5">
              Изменение отчета
            </Typography>
            <Stack spacing={2}>
              <Controller
                control={control}
                rules={{
                  validate: (value) => value instanceof File,
                }}
                render={({ field, fieldState }) => {
                  return (
                    <MuiFileInput
                      {...field}
                      inputProps={{ accept: ".xlsx, .xls" }}
                      label="Бухгалтерский баланс"
                      helperText={fieldState.invalid ? "Выбирете файл!" : ""}
                      error={fieldState.invalid}
                    />
                  );
                }}
                name="balanceFile"
              />
              <Controller
                control={control}
                rules={{
                  validate: (value) => value instanceof File,
                }}
                render={({ field, fieldState }) => {
                  return (
                    <MuiFileInput
                      {...field}
                      inputProps={{ accept: ".xlsx, .xls" }}
                      label="Отчет о прибылях и убытках"
                      helperText={fieldState.invalid ? "Выбирете файл!" : ""}
                      error={fieldState.invalid}
                    />
                  );
                }}
                name="profitNLossFile"
              />
              <Controller
                control={control}
                rules={{
                  validate: (value) => value instanceof File,
                }}
                render={({ field, fieldState }) => {
                  return (
                    <MuiFileInput
                      {...field}
                      inputProps={{ accept: ".xlsx, .xls" }}
                      label={"Отчет о движении денежных средств"}
                      helperText={fieldState.invalid ? "Выбирете файл!" : ""}
                      error={fieldState.invalid}
                    />
                  );
                }}
                name="cashFlowFile"
              />
              <Button variant="contained" type="submit" disabled={!isValid}>
                Изменить
              </Button>
            </Stack>
          </Stack>
        </form>
      </Card>
    </IndicatorsUpdateContainer>
  );
};

export default IndicatorsUpdatePage;
