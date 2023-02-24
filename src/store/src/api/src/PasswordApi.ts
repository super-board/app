import {createApi} from "@reduxjs/toolkit/query/react";

import {OTBBaseQueryWithReAuthentication} from "./config";
import {EmailVerificationPayload, ResetPasswordForm} from "./types";

export const PasswordApi = createApi({
  reducerPath: "PasswordApi",
  baseQuery: OTBBaseQueryWithReAuthentication,
  endpoints: build => ({
    sendPasswordVerificationMail: build.mutation<
      Pick<EmailVerificationPayload, "clientKey">,
      string
    >({
      query: (email: string) => ({url: "passwords/code", params: {email}, method: "GET"}),
    }),
    verifyPasswordAuthCode: build.mutation<string, EmailVerificationPayload>({
      query: (payload: EmailVerificationPayload) => ({
        url: "passwords/code-check",
        method: "POST",
        body: payload,
        responseHandler: response => response.text(),
      }),
    }),
    updatePassword: build.mutation<null, ResetPasswordForm>({
      query: (payload: ResetPasswordForm) => ({
        url: "passwords",
        method: "PATCH",
        body: payload,
      }),
    }),
    checkPasswordShouldBeChanged: build.mutation<null, void>({
      query: () => ({url: "passwords/deadline", method: "GET"}),
    }),
  }),
});

export const {
  useSendPasswordVerificationMailMutation,
  useVerifyPasswordAuthCodeMutation,
  useUpdatePasswordMutation,
  useCheckPasswordShouldBeChangedMutation,
} = PasswordApi;
