import {
  Button,
  Card,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { orgRegions } from "assets/ConstData/OrgRegions";
import { orgTypes } from "assets/ConstData/OrgTypes";
import CircleBackdropLoader from "components/Loaders/CircleBackdropLoader";
import OrganizationUpdateForm from "components/Organization/OrganizationUpdateForm";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrganizationQuery, usePutOrganizationMutation } from "services/api/organizations.service";
import { OrganizationUpdateRequest } from "types/OrganizationUpdateRequest";

const OrganizationUpdateContainer = styled(Container)(({ theme }) => ({
  height: "100svh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const OrganizationUpdatePage = () => {
  const { organizationId } = useParams();

  if (organizationId)
    return (
      <OrganizationUpdateContainer>
        <OrganizationUpdateForm organizationId={organizationId} />
      </OrganizationUpdateContainer>
    );

  return null;
};

export default OrganizationUpdatePage;
