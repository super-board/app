import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";

import {reviewQueries} from "@/services/api/src/reviewQueries";

import {boardGameQueries} from "./boardGameQueries";
import {notificationsQuery} from "./notificationsQuery";
import {tagQueries} from "./tagQueries";
import {BoardGameSummary, Notifications, ReviewSummary, TagGroup} from "./types";

export const OTBApi = createApi({
  reducerPath: "OTBApi",
  // FIXME: 백엔드 서버 구축 완료되면 fakeBaseQuery를 fetchBaseQuery로 교체해야 함.
  baseQuery: fakeBaseQuery(),
  endpoints: build => ({
    getTagList: build.query<TagGroup[], void>({
      queryFn: tagQueries.getTagList.queryFn,
    }),
    getBoardGamesForHomeCuration: build.query<BoardGameSummary[], void>({
      queryFn: boardGameQueries.getBoardGamesForHomeCuration.queryFn,
    }),
    getTop10BoardGames: build.query<BoardGameSummary[], void>({
      queryFn: boardGameQueries.getTop10BoardGames.queryFn,
    }),
    getRecommendedBoardGamesByTags: build.query<
      BoardGameSummary[],
      {tagIds: number[]; page: number}
    >({
      queryFn: boardGameQueries.getRecommendedBoardGamesByTags.queryFn,
      serializeQueryArgs: ({queryArgs}) => queryArgs.tagIds.join("&"),
      merge: (currentCacheData, responseData, {arg}) => {
        if (arg.page > 1) {
          currentCacheData.push(...responseData);
          return currentCacheData;
        }
        return responseData;
      },
      forceRefetch: ({currentArg, previousArg}) => currentArg !== previousArg,
    }),
    getBestReviews: build.query<ReviewSummary[], void>({
      queryFn: reviewQueries.getBestReviews.queryFn,
    }),
    getRecentNotifications: build.query<Notifications[], void>({
      queryFn: notificationsQuery.getRecentNotifications.queryFn,
    }),
  }),
});

export const {
  useGetTagListQuery,
  useGetBoardGamesForHomeCurationQuery,
  useGetTop10BoardGamesQuery,
  useGetRecommendedBoardGamesByTagsQuery,
  useGetBestReviewsQuery,
  useGetRecentNotificationsQuery,
} = OTBApi;
