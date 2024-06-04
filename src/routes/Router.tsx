import Layout from "components/Layout/Layout";
import HomePage from "pages/HomePage";
import IndicatorsCreatePage from "pages/IndicatorsCreatePage";
import IndicatorsPage from "pages/IndicatorsPage";
import IndicatorsUpdatePage from "pages/IndicatorsUpdatePage";
import MyOrganizationsPage from "pages/MyOrganizationsPage";
import NotFoundPage from "pages/NotFoundPage";
import OrganizationCreate from "pages/OrganizationCreate";
import OrganizationPage from "pages/OrganizationPage";
import OrganizationUpdatePage from "pages/OrganizationUpdatePage";
import OrganizationsPage from "pages/OrganizationsPage";
import ProfilePage from "pages/ProfilePage";
import SignInPage from "pages/SignInPage";
import SignUpPage from "pages/SignUpPage";
import StatsPage from "pages/StatsPage";
import UserUpdatePage from "pages/UserUpdatePage";
import UsersPage from "pages/UsersPage";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/organizations">
          <Route index element={<OrganizationsPage />} />
          <Route path=":organizationId">
            <Route index element={<OrganizationPage />} />
            <Route path="indicators">
              <Route path=":year" element={<IndicatorsPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="/me">
          <Route index element={<ProfilePage />} />
          <Route path="organizations">
            <Route index element={<MyOrganizationsPage />} />
          </Route>
        </Route>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Route>
      <Route path="/organizations/create" element={<OrganizationCreate />} />
      <Route path="/organizations/:organizationId/indicators/create" element={<IndicatorsCreatePage />} />
      <Route path="/me/update" element={<UserUpdatePage />} />
      <Route path="/organizations/:organizationId/update" element={<OrganizationUpdatePage />} />
      <Route path="/organizations/:organizationId/indicators/:year/update" element={<IndicatorsUpdatePage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
