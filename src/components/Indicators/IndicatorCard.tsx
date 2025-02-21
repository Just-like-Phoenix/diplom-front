import { Button, Card, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const IndicatorCard = ({ year }: { year: number }) => {
  const navigate = useNavigate();

  return (
    <Card elevation={8} sx={{ margin: 2 }}>
      <Stack margin={2} spacing={2} direction={"row"} justifyContent={"space-between"}>
        <Stack>
          <Typography variant="h6">{year}</Typography>
        </Stack>

        <Button variant="contained" size="small" onClick={(e) => navigate("indicators/" + year)}>
          Просмотреть
        </Button>
      </Stack>
    </Card>
  );
};

export default IndicatorCard;
