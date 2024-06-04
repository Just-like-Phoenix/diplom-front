import { Container, styled } from "@mui/material";
import IndicatorsCreateForm from "components/Indicators/IndicatorsCreateForm";
import OrganizationCreateForm from "components/Organization/OrganizationCreateForm";
import { useParams } from "react-router-dom";

const IndicatorsCreateContainer = styled(Container)(({ theme }) => ({
  height: "100svh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const IndicatorsCreatePage = () => {
  const { organizationId } = useParams();

  return (
    <IndicatorsCreateContainer>
      <IndicatorsCreateForm organizationId={organizationId as string} />
    </IndicatorsCreateContainer>
  );
};

export default IndicatorsCreatePage;
