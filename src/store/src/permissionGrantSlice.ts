import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import keys from "@/constants/keys";
import {AsyncStorageService} from "@/services/storage";

type PermissionGrantState = {
  loading: "idle" | "pending" | "success";
  shouldRequestPermissionGrant: boolean;
};

const initialState = {
  loading: "idle",
  shouldRequestPermissionGrant: true,
} as PermissionGrantState;

export const permissionGrantSlice = createSlice({
  name: "permissionGrant",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(checkPermissionGrantRequestedAsync.fulfilled, (state, action) => {
      state.loading = "pending";
      state.shouldRequestPermissionGrant = !action.payload;
      state.loading = "success";
    });
    builder.addCase(savePermissionGrantResultAsync.fulfilled, (state, action) => {
      state.loading = "pending";
      state.shouldRequestPermissionGrant = !action.payload;
      state.loading = "success";
    });
  },
});

export const checkPermissionGrantRequestedAsync = createAsyncThunk(
  "onboarding/checkPermissionGrantRequestedStatus",
  async () => {
    return await AsyncStorageService.containsKey(keys.PERMISSION_GRANT_REQUESTED);
  },
);

export const savePermissionGrantResultAsync = createAsyncThunk(
  "onboarding/savePermissionGrantResultStatus",
  async () => {
    await AsyncStorageService.saveData(keys.PERMISSION_GRANT_REQUESTED, true);
    return true;
  },
);

export default permissionGrantSlice.reducer;
