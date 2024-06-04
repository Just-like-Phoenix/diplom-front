import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IndicatorsCreateData } from "types/IndicatorsCreateData";
import { IndicatorsDataResponse } from "types/IndicatorsDataResponse";
import { IndicatorsResponse } from "types/IndicatorsResponse";
import { IndicatorsUpdateRequest } from "types/IndicatorsUpdateRequest";
import { UserInfoData } from "types/UserInfoData";
import { getCookie } from "typescript-cookie";

export const indicatorsApi = createApi({
  reducerPath: "indicatorsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7054" }),
  tagTypes: ["Indicators"],
  endpoints: (builder) => ({
    postOrganizationIndicators: builder.mutation<any, { organizationId: string; data: IndicatorsCreateData }>({
      query: ({ organizationId, data }) => ({
        url: `/organizations/${organizationId}/indicators`,
        method: "POST",
        headers: {
          Authorization: `${getCookie("type")} ${getCookie("token")}`,
        },
        body: data,
      }),
      invalidatesTags: ["Indicators"],
    }),
    getOrganizationIndicators: builder.query<IndicatorsResponse[], string>({
      query: (organizationId) => ({
        url: `/organizations/${organizationId}/indicators`,
        method: "GET",
      }),
      providesTags: ["Indicators"],
    }),
    getOrganizationIndicatorsData: builder.query<IndicatorsDataResponse[], string>({
      query: (organizationId) => ({
        url: `/organizations/${organizationId}/indicators/data`,
        method: "GET",
      }),
      providesTags: ["Indicators"],
    }),
    getOrganizationIndicatorsDataByYear: builder.query<IndicatorsDataResponse, { organizationId: string; year: string }>({
      query: ({ organizationId, year }) => ({
        url: `/organizations/${organizationId}/indicators/${year}/data`,
        method: "GET",
      }),
      providesTags: ["Indicators"],
    }),
    deleteOrganizationIndicatorsDataByYear: builder.mutation<any, { organizationId: string; year: string }>({
      query: ({ organizationId, year }) => ({
        url: `/organizations/${organizationId}/indicators/${year}`,
        method: "DELETE",
        headers: {
          Authorization: `${getCookie("type")} ${getCookie("token")}`,
        },
      }),
      invalidatesTags: ["Indicators"],
    }),
    putOrganizationIndicatorsDataByYear: builder.mutation<any, { organizationId: string; year: string; data: IndicatorsUpdateRequest }>({
      query: ({ organizationId, year, data }) => ({
        url: `/organizations/${organizationId}/indicators/${year}`,
        method: "PUT",
        headers: {
          Authorization: `${getCookie("type")} ${getCookie("token")}`,
        },
        body: data,
      }),
      invalidatesTags: ["Indicators"],
    }),
  }),
});

export const {
  usePostOrganizationIndicatorsMutation,
  useDeleteOrganizationIndicatorsDataByYearMutation,
  usePutOrganizationIndicatorsDataByYearMutation,
  useGetOrganizationIndicatorsQuery,
  useGetOrganizationIndicatorsDataQuery,
  useGetOrganizationIndicatorsDataByYearQuery,
} = indicatorsApi;
