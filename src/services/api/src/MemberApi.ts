import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

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
  }),
});

export const {useCheckDuplicateEmailRegisteredMutation} = MemberApi;
