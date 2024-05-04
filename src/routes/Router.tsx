import SignInPage from "pages/SignInPage";
import SignUpPage from "pages/SignUpPage";
import TestHomePage from "pages/TestHomePage";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<TestHomePage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
};

export default Router;
