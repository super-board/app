import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import keys from "@/constants/keys";
import {AsyncStorageService} from "@/services/storage";

type OnboardingState = {
  shouldRequestOnboarding: boolean;
  loading: "idle" | "pending" | "success";
};

const initialState = {
  shouldRequestOnboarding: true,
  loading: "idle",
} as OnboardingState;

export const checkOnboardingCompletedAsync = createAsyncThunk(
  "onboarding/checkOnboardingCompletedStatus",
  async () => {
    return await AsyncStorageService.containsKey(keys.ONBOARDING_COMPLETED);
  },
);

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(checkOnboardingCompletedAsync.fulfilled, (state, action) => {
      state.loading = "pending";
      state.shouldRequestOnboarding = !action.payload;
      state.loading = "success";
    });
  },
});

export default onboardingSlice.reducer;
