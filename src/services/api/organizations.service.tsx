import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OrganizationCreateData } from "types/OrganizationCreateData";

export const organizationsApi = createApi({
  reducerPath: "organizationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7054" }),
  endpoints: (builder) => ({
    postOrganizations: builder.mutation({
      query: (data: OrganizationCreateData) => ({
        url: "/organizations",
        method: "POST",
        body: data,
      }),
    }),
    getOrganizations: builder.query({
      query: (data) => ({
        url: "/organizations",
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const {} = organizationsApi;
