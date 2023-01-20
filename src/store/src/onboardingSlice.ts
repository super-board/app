import {PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import keys from "@/constants/keys";
import {AsyncStorageService} from "@/services/storage";

type OnboardingState = {
  loading: "idle" | "pending" | "success";
  shouldRequestOnboarding: boolean;
};

const initialState = {
  loading: "idle",
  shouldRequestOnboarding: true,
} as OnboardingState;

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

export const checkOnboardingCompletedAsync = createAsyncThunk(
  "onboarding/checkOnboardingCompletedStatus",
  async () => {
    return await AsyncStorageService.containsKey(keys.ONBOARDING_COMPLETED);
  },
);

export default onboardingSlice.reducer;
