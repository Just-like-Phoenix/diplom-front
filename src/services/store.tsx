import { configureStore } from "@reduxjs/toolkit";
import { authorizationApi } from "./api/authorization.service";
import { organizationsApi, userOrganizationsApi } from "./api/organizations.service";
import { userApi } from "./api/user.service";
import { indicatorsApi } from "./api/indicators.service";

export const store = configureStore({
  reducer: {
    [authorizationApi.reducerPath]: authorizationApi.reducer,
    [organizationsApi.reducerPath]: organizationsApi.reducer,
    [userOrganizationsApi.reducerPath]: userOrganizationsApi.reducer,
    [indicatorsApi.reducerPath]: indicatorsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authorizationApi.middleware,
      organizationsApi.middleware,
      userOrganizationsApi.middleware,
      indicatorsApi.middleware,
      userApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
