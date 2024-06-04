import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OrganizationCreateData } from "types/OrganizationCreateData";
import { OrganizationResponse } from "types/OrganizationResponse";
import { OrganizationUpdateRequest } from "types/OrganizationUpdateRequest";
import { getCookie } from "typescript-cookie";

export const organizationsApi = createApi({
  reducerPath: "organizationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7054" }),
  tagTypes: ["Organizations"],
  endpoints: (builder) => ({
    postOrganizations: builder.mutation<any, OrganizationCreateData>({
      query: (data) => ({
        url: "/organizations",
        method: "POST",
        headers: {
          Authorization: `${getCookie("type")} ${getCookie("token")}`,
        },
        body: data,
      }),
      invalidatesTags: ["Organizations"],
    }),
    getOrganizations: builder.query<OrganizationResponse[], string>({
      query: (searchString) => ({
        url: `/organizations?searchString=${searchString}`,
        method: "GET",
      }),
      providesTags: ["Organizations"],
    }),
    getOrganization: builder.query<OrganizationResponse, string>({
      query: (organizationId) => ({
        url: `/organizations/` + `${organizationId}`,
        method: "GET",
      }),
      providesTags: ["Organizations"],
    }),
    putOrganization: builder.mutation<any, { organizationId: string; data: OrganizationUpdateRequest }>({
      query: ({ organizationId, data }) => ({
        url: `/organizations/` + `${organizationId}`,
        method: "PUT",
        headers: {
          Authorization: `${getCookie("type")} ${getCookie("token")}`,
        },
        body: data,
      }),
      invalidatesTags: ["Organizations"],
    }),
  }),
});

export const userOrganizationsApi = createApi({
  reducerPath: "userOrganizationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7054" }),
  tagTypes: ["Organizations"],
  endpoints: (builder) => ({
    getUserOrganizations: builder.query<OrganizationResponse[], string>({
      query: (searchString) => ({
        url: `/me/organizations?searchString=${searchString}`,
        method: "GET",
        headers: {
          Authorization: `${getCookie("type")} ${getCookie("token")}`,
        },
      }),
      providesTags: ["Organizations"],
    }),
    deleteOrganization: builder.mutation<any, string>({
      query: (organizationId) => ({
        url: `/organizations/` + `${organizationId}`,
        method: "DELETE",
        headers: {
          Authorization: `${getCookie("type")} ${getCookie("token")}`,
        },
      }),
      invalidatesTags: ["Organizations"],
    }),
  }),
});

export const { usePostOrganizationsMutation, useGetOrganizationsQuery, useGetOrganizationQuery, usePutOrganizationMutation } = organizationsApi;

export const { useGetUserOrganizationsQuery, useDeleteOrganizationMutation } = userOrganizationsApi;
