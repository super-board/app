import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";

import {AuthApi, MemberApi, OTBApi} from "@/services/api";

import authSlice from "./authSlice";
import interestTagSlice from "./interestTagSlice";
import onboardingSlice from "./onboardingSlice";
import searchQuerySlice from "./searchQuerySlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    onboarding: onboardingSlice,
    interestTag: interestTagSlice,
    searchQuery: searchQuerySlice,
    [OTBApi.reducerPath]: OTBApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [MemberApi.reducerPath]: MemberApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(OTBApi.middleware)
      .concat(AuthApi.middleware)
      .concat(MemberApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
