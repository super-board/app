import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import type {RegisterForm} from "./types";

export const MemberApi = createApi({
  reducerPath: "MemberApi",
  baseQuery: fetchBaseQuery({baseUrl: "http://129.154.193.47/api/v1/members"}),
  endpoints: build => ({
    checkDuplicateEmailRegistered: build.mutation<null, string>({
      query: (email: string) => ({
        url: "mail-check",
        params: {email},
        method: "GET",
        responseHandler: "text",
      }),
    }),
    checkDuplicateNicknameRegistered: build.mutation<null, string>({
      query: (nickname: string) => ({
        url: "nickname-check",
        params: {nickname},
        method: "GET",
        responseHandler: "text",
      }),
    }),
    signUpWithEmailAndPassword: build.mutation<null, RegisterForm>({
      query: (form: RegisterForm) => ({
        url: "sign-up",
        method: "POST",
        body: form,
      }),
    }),
  }),
});

export const {
  useCheckDuplicateEmailRegisteredMutation,
  useCheckDuplicateNicknameRegisteredMutation,
  useSignUpWithEmailAndPasswordMutation,
} = MemberApi;
