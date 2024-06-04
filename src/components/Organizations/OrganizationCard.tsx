import { Email } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrganizationCard = ({
  organizationId,
  regNum,
  orgName,
  orgRegion,
  orgType,
}: {
  organizationId: string;
  regNum: number;
  orgName: string;
  orgRegion: string;
  orgType: string;
}) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Card elevation={4}>
      <Stack
        margin={2}
        spacing={2}
        width={"100%"}
        direction={"row"}
        justifyContent={"space-between"}
      >
        <Stack width={"100%"}>
          <Link
            variant="h5"
            underline="hover"
            width={"100%"}
            color={theme.palette.text.primary}
            onClick={(e) => {
              navigate("/organizations/" + organizationId);
            }}
          >
            {orgName}
          </Link>

          <Stack direction={"row"} spacing={2}>
            <Stack>
              <Typography variant="overline">УНП</Typography>
              <Typography>{regNum}</Typography>
            </Stack>
            <Stack>
              <Typography variant="overline">Область</Typography>
              <Typography>{orgRegion}</Typography>
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="overline">Вид деятельности</Typography>
            <Typography>{orgType}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default OrganizationCard;
