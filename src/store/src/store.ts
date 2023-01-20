import {configureStore} from "@reduxjs/toolkit";

import onboardingSlice from "./onboardingSlice";

export const store = configureStore({
  reducer: {
    onboarding: onboardingSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
