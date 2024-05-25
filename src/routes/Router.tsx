import AppDrawer from "components/Layout/AppDrawer";
import Layout from "components/Layout/Layout";
import NotFoundPage from "pages/NotFoundPage";
import SignInPage from "pages/SignInPage";
import SignUpPage from "pages/SignUpPage";
import TestHomePage from "pages/TestHomePage";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<TestHomePage />} />
      </Route>

      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
