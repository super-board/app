import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";

import {
  Badge,
  BoardGameDetails,
  BoardGameSummary,
  MyPageDetails,
  Notifications,
  PaginatedComments,
  PaginatedReviews,
  ReviewSummary,
  TagGroup,
} from "../types";
import {boardGameQueries} from "./boardGameQueries";
import {commentQueries} from "./commentQueries";
import {notificationsQuery} from "./notificationsQuery";
import {reviewQueries} from "./reviewQueries";
import {tagQueries} from "./tagQueries";

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
    getBoardGamesByName: build.query<BoardGameSummary[], {query: string; page: number}>({
      queryFn: boardGameQueries.getBoardGamesByName.queryFn,
      serializeQueryArgs: ({queryArgs}) => queryArgs.query,
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
    getReviews: build.query<PaginatedReviews, {boardGameId: number; page: number}>({
      queryFn: reviewQueries.getReviews.queryFn,
      serializeQueryArgs: ({queryArgs}) => queryArgs.boardGameId,
      merge: (currentCacheData, responseData, {arg}) => {
        if (arg.page > 1) {
          currentCacheData.hasNext = responseData.hasNext;
          currentCacheData.reviews.push(...responseData.reviews);
          return currentCacheData;
        }
        return responseData;
      },
      forceRefetch: ({currentArg, previousArg}) => currentArg !== previousArg,
    }),
    getComments: build.query<
      PaginatedComments,
      {boardGameId: number; reviewId: number; page: number}
    >({
      queryFn: commentQueries.getComments.queryFn,
      serializeQueryArgs: ({queryArgs}) => queryArgs.boardGameId,
      merge: (currentCacheData, responseData, {arg}) => {
        if (arg.page > 1) {
          currentCacheData.hasNext = responseData.hasNext;
          currentCacheData.comments.push(...responseData.comments);
          return currentCacheData;
        }
        return responseData;
      },
      forceRefetch: ({currentArg, previousArg}) => currentArg !== previousArg,
    }),
    getRecentNotifications: build.query<Notifications[], void>({
      queryFn: notificationsQuery.getRecentNotifications.queryFn,
    }),
    getBoardGameDetails: build.query<BoardGameDetails, number>({
      queryFn: boardGameQueries.getBoardGameDetails.queryFn,
    }),
    getMyPageDetails: build.query<MyPageDetails, void>({
      queryFn: () => {
        return {
          data: {
            nickname: "테스트",
            level: "SPADE",
            point: 300,
            profileCharacter: "PROFILE_3",
            badgeCounts: 2,
            favoriteTags: [
              {id: 1, name: "2인이상", type: "PLAYERS"},
              {id: 2, name: "카드", type: "CATEGORY"},
              {id: 3, name: "18+", type: "AGE"},
              {id: 4, name: "15+", type: "AGE"},
              {id: 5, name: "협동/전략", type: "CATEGORY"},
            ],
            favoriteBoardGames: [
              {id: 1, name: "테라포밍 마스:익스페디션", imageUrl: "no-image", averageRating: 4.64},
              {id: 2, name: "글룸헤이븐", imageUrl: "no-image", averageRating: 4.64},
              {id: 3, name: "한밤의 늑대인간", imageUrl: "no-image", averageRating: 4.64},
            ],
            myReviews: [
              {
                boardGame: {
                  id: 1,
                  name: "테라포밍 마스:익스페디션",
                  imageUrl: "no-image",
                  averageRating: 4.64,
                },
              },
            ],
          } as MyPageDetails,
        };
      },
    }),
    getMyBadges: build.query<Badge[], void>({
      queryFn: () => ({
        data: [
          {id: 1, type: 1, isAchieved: true},
          {id: 5, type: 5, isAchieved: true},
        ] as Badge[],
      }),
    }),
  }),
});

export const {
  useGetTagListQuery,
  useGetBoardGamesForHomeCurationQuery,
  useGetTop10BoardGamesQuery,
  useGetRecommendedBoardGamesByTagsQuery,
  useGetBoardGamesByNameQuery,
  useGetBestReviewsQuery,
  useGetReviewsQuery,
  useGetCommentsQuery,
  useGetRecentNotificationsQuery,
  useGetBoardGameDetailsQuery,
  useGetMyPageDetailsQuery,
  useGetMyBadgesQuery,
} = OTBApi;
