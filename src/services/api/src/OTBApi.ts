import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";

import {BoardGameSummary, boardGameQueries} from "./boardGameQueries";
import {TagGroup, tagQueries} from "./tagQueries";

export const OTBApi = createApi({
  reducerPath: "OTBApi",
  // FIXME: 백엔드 서버 구축 완료되면 fakeBaseQuery를 fetchBaseQuery로 교체해야 함.
  baseQuery: fakeBaseQuery(),
  endpoints: build => ({
    getTags: build.query<TagGroup[], void>({
      queryFn: tagQueries.getTags.queryFn,
    }),
    getRecommendedBoardGames: build.query<BoardGameSummary[], void>({
      queryFn: boardGameQueries.getRecommendedBoardGames.queryFn,
    }),
  }),
});

export const {useGetTagsQuery, useGetRecommendedBoardGamesQuery} = OTBApi;