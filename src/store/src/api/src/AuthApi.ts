import {createApi} from "@reduxjs/toolkit/query/react";

import {saveTokensAsync} from "../../authSlice";
import {OTBBaseQueryWithReAuthentication} from "./config";
import {EmailVerificationPayload, LoginForm} from "./types";

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: OTBBaseQueryWithReAuthentication,
  endpoints: build => ({
    sendVerificationMail: build.mutation<Pick<EmailVerificationPayload, "clientKey">, string>({
      query: (email: string) => ({url: "auth/code", params: {email}, method: "GET"}),
    }),
    verifyAuthCode: build.mutation<null, EmailVerificationPayload>({
      query: (payload: EmailVerificationPayload) => ({
        url: "auth/code-check",
        method: "POST",
        body: payload,
      }),
    }),
    signIn: build.mutation<null, LoginForm>({
      query: (payload: LoginForm) => ({
        url: "auth/sign-in",
        method: "POST",
        body: payload,
      }),
      onQueryStarted: async (_, {dispatch, queryFulfilled}) => {
        try {
          const {meta} = await queryFulfilled;
          const accessToken = meta?.response?.headers.get("Authorization");
          const refreshToken = meta?.response?.headers.get("RefreshToken");
          dispatch(saveTokensAsync({accessToken, refreshToken}));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {useSendVerificationMailMutation, useVerifyAuthCodeMutation, useSignInMutation} =
  AuthApi;