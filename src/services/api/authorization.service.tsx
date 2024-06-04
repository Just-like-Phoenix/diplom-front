import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignInData } from "types/SignInData";
import { SignInResponse } from "types/SignInResponse";
import { SignUpRequest } from "types/SignUpData";

export const authorizationApi = createApi({
  reducerPath: "authorizationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7054" }),
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponse, SignInData>({
      query: (data) => ({
        url: "/sign-in",
        method: "POST",
        body: data,
      }),
    }),
    signUp: builder.mutation<void, SignUpRequest>({
      query: (data) => ({
        url: "/sign-up",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authorizationApi;
