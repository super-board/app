import {createApi} from "@reduxjs/toolkit/query/react";

import {OTBBaseQueryWithReAuthentication} from "./config";
import type {MemberDetails, RegisterForm} from "./types";

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
    // FIXME: API 연동할 때 더미데이터 지우기
    getMyMemberInfo: build.query<MemberDetails, void>({
      queryFn: () => ({
        data: {
          id: 0,
          email: "test@test.com",
          nickname: "테스트사용자",
          profileCharacter: "PROFILE_3",
          level: "CLOVER",
          role: "USER",
        } as MemberDetails,
        // data: {
        //   id: 1,
        //   email: "test@test.com",
        //   nickname: "테스트관리자",
        //   profileCharacter: "PROFILE_5",
        //   level: "JOKER",
        //   role: "ADMIN",
        // }
      }),
      keepUnusedDataFor: 1800,
    }),
  }),
});

export const {
  useCheckDuplicateEmailRegisteredMutation,
  useCheckDuplicateNicknameRegisteredMutation,
  useSignUpWithEmailAndPasswordMutation,
  useGetMyMemberInfoQuery,
} = MemberApi;
