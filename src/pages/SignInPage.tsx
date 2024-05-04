import styled from "@emotion/styled";
import { Container } from "@mui/material";
import SignInForm from "components/SignIn/SignInForm";

const SignInContainer = styled(Container)(({ theme }) => ({
  height: "100svh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const SignInPage = () => {
  return (
    <SignInContainer>
      <SignInForm />
    </SignInContainer>
  );
};

export default SignInPage;
