import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignInRequest } from "types/SignInData";
import { SignUpRequest } from "types/SignUpData";

export const authorizationApi = createApi({
  reducerPath: "authorizationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7054" }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data: SignInRequest) => ({
        url: "/api/identity/signin",
        method: "POST",
        body: data,
      }),
    }),
    signUp: builder.mutation({
      query: (data: SignUpRequest) => ({
        url: "/api/identity/signup",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authorizationApi;
