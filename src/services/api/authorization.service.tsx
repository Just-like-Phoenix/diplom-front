import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignInRequest } from "types/SignInData";
import { SignInResponse } from "types/SignInResponse";
import { SignUpRequest } from "types/SignUpData";

export const authorizationApi = createApi({
  reducerPath: "authorizationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7054" }),
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: (data) => ({
        url: "/sign-in",
        method: "POST",
        body: data,
      }),
    }),
    signUp: builder.mutation({
      query: (data: SignUpRequest) => ({
        url: "/sign-up",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authorizationApi;
