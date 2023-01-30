import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";

import {reviewQueries} from "@/services/api/src/reviewQueries";
import {BoardGameSummary, ReviewSummary} from "@/services/api/src/types";

import {boardGameQueries} from "./boardGameQueries";
import {TagGroup, tagQueries} from "./tagQueries";

export const OTBApi = createApi({
  reducerPath: "OTBApi",
  // FIXME: 백엔드 서버 구축 완료되면 fakeBaseQuery를 fetchBaseQuery로 교체해야 함.
  baseQuery: fakeBaseQuery(),
  endpoints: build => ({
    getTags: build.query<TagGroup[], void>({
      queryFn: tagQueries.getTags.queryFn,
    }),
    getBoardGamesForHomeCuration: build.query<BoardGameSummary[], void>({
      queryFn: boardGameQueries.getBoardGamesForHomeCuration.queryFn,
    }),
    getRecommendedBoardGamesByTags: build.query<BoardGameSummary[], void>({
      queryFn: boardGameQueries.getRecommendedBoardGamesByTags.queryFn,
    }),
    getBestReviews: build.query<ReviewSummary[], void>({
      queryFn: reviewQueries.getBestReviews.queryFn,
    }),
  }),
});

export const {
  useGetTagsQuery,
  useGetBoardGamesForHomeCurationQuery,
  useGetRecommendedBoardGamesByTagsQuery,
  useGetBestReviewsQuery,
} = OTBApi;
