import { Container, Stack } from "@mui/material";
import CircleBackdropLoader from "components/Loaders/CircleBackdropLoader";
import UserInfo from "components/Profile/UserInfo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMeQuery } from "services/api/user.service";
import { UserInfoData } from "types/UserInfoData";

const ProfilePage = () => {
  const { data, isLoading, isSuccess } = useGetMeQuery();

  if (isLoading) return <CircleBackdropLoader open={isLoading} />;

  if (isSuccess && data) {
    return (
      <Container>
        <Stack direction={"column"} margin={1} spacing={1}>
          <UserInfo
            id={data.id}
            email={data.email}
            userName={data.userName}
            firstName={data.firstName}
            middleName={data.middleName}
            lastName={data.lastName}
          />
        </Stack>
      </Container>
    );
  }

  return null;
};

export default ProfilePage;
