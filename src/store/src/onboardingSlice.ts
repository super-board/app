import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

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
    builder.addCase(saveOnboardingResultAsync.fulfilled, (state, action) => {
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

export const saveOnboardingResultAsync = createAsyncThunk(
  "onboarding/saveOnboardingResultStatus",
  async (interestTagIds: number[]) => {
    await Promise.all([
      AsyncStorageService.saveData(keys.INTEREST_TAG_IDS, interestTagIds),
      AsyncStorageService.saveData(keys.ONBOARDING_COMPLETED, true),
    ]);
    return true;
  },
);

export default onboardingSlice.reducer;
