import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AdminUserInfoData, UserInfoData } from "types/UserInfoData";
import { UserUpdateRequest } from "types/UserUpdateRequest";
import { getCookie } from "typescript-cookie";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7054" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query<UserInfoData, void>({
      query: () => ({
        url: "/me",
        method: "GET",
        headers: {
          Authorization: `${getCookie("type")} ${getCookie("token")}`,
        },
      }),
      providesTags: ["User"],
    }),
    deleteMe: builder.mutation<any, void>({
      query: () => ({
        url: "/me",
        method: "DELETE",
        headers: {
          Authorization: `${getCookie("type")} ${getCookie("token")}`,
        },
      }),
      invalidatesTags: ["User"],
    }),
    putMe: builder.mutation<any, UserUpdateRequest>({
      query: (data) => ({
        url: "/me",
        method: "PUT",
        headers: {
          Authorization: `${getCookie("type")} ${getCookie("token")}`,
        },
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getUsers: builder.query<AdminUserInfoData[], void>({
      query: () => ({
        url: "/users",
        method: "GET",
        headers: {
          Authorization: `${getCookie("type")} ${getCookie("token")}`,
        },
      }),
      providesTags: ["User"],
    }),
    patchBlockUser: builder.mutation<any, string>({
      query: (userId) => ({
        url: `/users/${userId}/block`,
        method: "PATCH",
        headers: {
          Authorization: `${getCookie("type")} ${getCookie("token")}`,
        },
      }),
      invalidatesTags: ["User"],
    }),
    patchUnBlockUser: builder.mutation<any, string>({
      query: (userId) => ({
        url: `/users/${userId}/unblock`,
        method: "PATCH",
        headers: {
          Authorization: `${getCookie("type")} ${getCookie("token")}`,
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetMeQuery, useDeleteMeMutation, usePutMeMutation, useGetUsersQuery, usePatchBlockUserMutation, usePatchUnBlockUserMutation } =
  userApi;
