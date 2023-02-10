import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {EmailVerificationPayload} from "./types";

export const AuthenticationApi = createApi({
  reducerPath: "AuthenticationApi",
  baseQuery: fetchBaseQuery({baseUrl: "http://129.154.193.47/api/v1/auth"}),
  endpoints: build => ({
    sendVerificationMail: build.mutation<Pick<EmailVerificationPayload, "clientKey">, string>({
      query: (email: string) => ({url: "code", params: {email}, method: "GET"}),
    }),
    verifyAuthCode: build.mutation<null, EmailVerificationPayload>({
      query: (payload: EmailVerificationPayload) => ({
        url: "code-check",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {useSendVerificationMailMutation, useVerifyAuthCodeMutation} = AuthenticationApi;
