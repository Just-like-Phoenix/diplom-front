import { configureStore } from "@reduxjs/toolkit";
import { authorizationApi } from "./api/authorization.service";

export const store = configureStore({
  reducer: {
    [authorizationApi.reducerPath]: authorizationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authorizationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
