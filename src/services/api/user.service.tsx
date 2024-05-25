import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7054" }),
  endpoints: (builder) => ({
    getMe: builder.query({
      query: (data) => ({
        url: "/organizations",
        method: "POST",
        headers: {
          Authorization: `${localStorage.getItem(
            "type"
          )} ${localStorage.getItem("token")}}`,
        },
        body: data,
      }),
    }),
  }),
});

export const {} = userApi;
