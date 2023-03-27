import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import keys from "@/constants/keys";
import {SecureStorageService} from "@/services/storage";

type AuthState = {
  accessToken?: string | null;
  refreshToken?: string | null;
};

const initialState = {
  accessToken: null,
  refreshToken: null,
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(saveTokensAsync.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.refreshToken = action.payload;
    });
    builder.addCase(logoutAsync.fulfilled, state => {
      state.accessToken = null;
      state.refreshToken = null;
    });
  },
});

export const saveTokensAsync = createAsyncThunk(
  "auth/saveRefreshTokenStatus",
  async (tokens: AuthState) => {
    SecureStorageService.saveData(keys.REFRESH_TOKEN, tokens.refreshToken);
    return tokens;
  },
);

export const loginAsync = createAsyncThunk("auth/loginStatus", async () => {
  return await SecureStorageService.getData(keys.REFRESH_TOKEN);
});

export const logoutAsync = createAsyncThunk("auth/logoutStatus", async () => {
  await SecureStorageService.removeData(keys.REFRESH_TOKEN);
});

export default authSlice.reducer;
