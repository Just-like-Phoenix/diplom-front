import { Container, styled } from "@mui/material";
import OrganizationCreateForm from "components/Organization/OrganizationCreateForm";

const OrganizationCreateContainer = styled(Container)(({ theme }) => ({
  height: "100svh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const OrganizationCreate = () => {
  return (
    <OrganizationCreateContainer>
      <OrganizationCreateForm />
    </OrganizationCreateContainer>
  );
};

export default OrganizationCreate;
