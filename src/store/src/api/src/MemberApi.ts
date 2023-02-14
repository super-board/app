import {createApi} from "@reduxjs/toolkit/query/react";

import {OTBBaseQueryWithReAuthentication} from "./config";
import type {RegisterForm} from "./types";

export const MemberApi = createApi({
  reducerPath: "MemberApi",
  baseQuery: OTBBaseQueryWithReAuthentication,
  endpoints: build => ({
    checkDuplicateEmailRegistered: build.mutation<null, string>({
      query: (email: string) => ({
        url: "members/mail-check",
        params: {email},
        method: "GET",
        responseHandler: "text",
      }),
    }),
    checkDuplicateNicknameRegistered: build.mutation<null, string>({
      query: (nickname: string) => ({
        url: "members/nickname-check",
        params: {nickname},
        method: "GET",
        responseHandler: "text",
      }),
    }),
    signUpWithEmailAndPassword: build.mutation<null, RegisterForm>({
      query: (form: RegisterForm) => ({
        url: "members/sign-up",
        method: "POST",
        body: form,
        responseHandler: "text",
      }),
    }),
  }),
});

export const {
  useCheckDuplicateEmailRegisteredMutation,
  useCheckDuplicateNicknameRegisteredMutation,
  useSignUpWithEmailAndPasswordMutation,
} = MemberApi;
