import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";

import {OTBApi} from "@/services/api";

import onboardingSlice from "./onboardingSlice";

export const store = configureStore({
  reducer: {
    onboarding: onboardingSlice,
    [OTBApi.reducerPath]: OTBApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(OTBApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
