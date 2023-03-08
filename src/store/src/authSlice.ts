import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import keys from "@/constants/keys";
import {network} from "@/constants/network";
import {SecureStorageService} from "@/services/storage";

import {saveOnboardingResultAsync} from "./onboardingSlice";

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

export const loginAsync = createAsyncThunk("auth/loginStatus", async (_, thunkApi) => {
  let accessToken;
  let refreshToken;
  const oldRefreshToken = await SecureStorageService.getData(keys.REFRESH_TOKEN);
  try {
    const response = await fetch(`${network.OTB_API_BASE_URL}/auth/token-reissue`, {
      headers: new Headers({RefreshToken: oldRefreshToken}),
    });
    accessToken = response.headers.get("Authorization");
    refreshToken = response.headers.get("RefreshToken");
    // FIXME: 로그인 후 사용자 정보 받아서 태그 정보 업데이트
    thunkApi.dispatch(saveOnboardingResultAsync([]));
    thunkApi.dispatch(saveTokensAsync({accessToken, refreshToken}));
  } catch (e) {
    console.error(e);
  }
});

export const logoutAsync = createAsyncThunk("auth/logoutStatus", async () => {
  await SecureStorageService.removeData(keys.REFRESH_TOKEN);
});

export default authSlice.reducer;
