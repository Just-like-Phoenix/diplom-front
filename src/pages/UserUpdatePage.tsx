import { Container, styled } from "@mui/material";
import UserUpdateForm from "components/Profile/UserUpdateForm";

const UserUpdateContainer = styled(Container)(({ theme }) => ({
  height: "100svh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const UserUpdatePage = () => {
  return (
    <UserUpdateContainer>
      <UserUpdateForm />
    </UserUpdateContainer>
  );
};

export default UserUpdatePage;
