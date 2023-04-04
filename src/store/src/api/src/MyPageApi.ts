import {createApi} from "@reduxjs/toolkit/query/react";

import {AsyncStorageService, SecureStorageService} from "@/services/storage";

import {OTBBaseQueryWithReAuthentication} from "./config";

export const MyPageApi = createApi({
  reducerPath: "MyPageApi",
  baseQuery: OTBBaseQueryWithReAuthentication,
  endpoints: build => ({
    withdrawAccount: build.mutation<null, void>({
      query: () => ({url: "members/mypage/withdrawal", method: "PATCH"}),
      onQueryStarted: async (_, {queryFulfilled}) => {
        try {
          await queryFulfilled;
          await Promise.allSettled([
            AsyncStorageService.clearStorage(),
            SecureStorageService.clearStorage(),
          ]);
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const {useWithdrawAccountMutation} = MyPageApi;
