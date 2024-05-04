import styled from "@emotion/styled";
import { Container } from "@mui/material";
import SignUpForm from "components/SignUp/SignUpForm";

const SignUpContainer = styled(Container)(({ theme }) => ({
  height: "100svh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const SignUpPage = () => {
  return (
    <SignUpContainer>
      <SignUpForm />
    </SignUpContainer>
  );
};

export default SignUpPage;
