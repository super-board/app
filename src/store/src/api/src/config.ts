import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import {Mutex} from "async-mutex";

import {network} from "@/constants/network";

import {logoutAsync, saveTokensAsync} from "../../authSlice";
import {RootState} from "../../store";

const mutex = new Mutex();

const OTBBaseQuery = fetchBaseQuery({
  baseUrl: network.OTB_API_BASE_URL,
  prepareHeaders: (headers, {getState}) => {
    if (headers.has("RefreshToken")) return headers;
    const accessToken = (getState() as RootState).auth.accessToken;
    if (accessToken) headers.set("Authorization", `${accessToken}`);
    return headers;
  },
});

export const OTBBaseQueryWithReAuthentication: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await OTBBaseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    if (mutex.isLocked()) {
      await mutex.waitForUnlock();
      return await OTBBaseQuery(args, api, extraOptions);
    }

    const release = await mutex.acquire();
    try {
      const refreshResult = await OTBBaseQuery(
        {
          url: "/auth/token-reissue",
          headers: {RefreshToken: (api.getState() as RootState).auth.refreshToken!},
        },
        api,
        extraOptions,
      );
      if (refreshResult.error) {
        api.dispatch(logoutAsync());
      } else {
        const accessToken = refreshResult.meta?.response?.headers.get("Authorization");
        const refreshToken = refreshResult.meta?.response?.headers.get("RefreshToken");
        api.dispatch(saveTokensAsync({accessToken, refreshToken}));
      }
    } finally {
      release();
    }
  }

  return result;
};
