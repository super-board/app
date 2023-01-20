import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";

import tagQueries from "@/services/api/src/tagQueries";

export const OTBApi = createApi({
  reducerPath: "OTBApi",
  // FIXME: 백엔드 서버 구축 완료되면 fakeBaseQuery를 fetchBaseQuery로 교체해야 함.
  baseQuery: fakeBaseQuery(),
  endpoints: build => ({
    getTags: build.query<any, void>({
      queryFn: tagQueries.getTags.queryFn,
    }),
  }),
});

export const {useGetTagsQuery} = OTBApi;
