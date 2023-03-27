import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";

import {
  Badge,
  BoardGameDetails,
  BoardGameSummary,
  CommentDetails,
  MyPageDetails,
  Notifications,
  Paginated,
  ReviewDetails,
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
    getReviews: build.query<Paginated<ReviewDetails>, {boardGameId: number; page: number}>({
      queryFn: reviewQueries.getReviews.queryFn,
      serializeQueryArgs: ({queryArgs}) => queryArgs.boardGameId,
      merge: (currentCacheData, responseData, {arg}) => {
        if (arg.page > 1) {
          currentCacheData.hasNext = responseData.hasNext;
          currentCacheData.content.push(...responseData.content);
          return currentCacheData;
        }
        return responseData;
      },
      forceRefetch: ({currentArg, previousArg}) => currentArg !== previousArg,
    }),
    getComments: build.query<
      Paginated<CommentDetails>,
      {boardGameId: number; reviewId: number; page: number}
    >({
      queryFn: commentQueries.getComments.queryFn,
      serializeQueryArgs: ({queryArgs}) => queryArgs.boardGameId,
      merge: (currentCacheData, responseData, {arg}) => {
        if (arg.page > 1) {
          currentCacheData.hasNext = responseData.hasNext;
          currentCacheData.content.push(...responseData.content);
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
              {id: 4, name: "테라포밍 마스:익스페디션", imageUrl: "no-image", averageRating: 4.64},
              {id: 5, name: "글룸헤이븐", imageUrl: "no-image", averageRating: 4.64},
              {id: 6, name: "한밤의 늑대인간", imageUrl: "no-image", averageRating: 4.64},
            ],
            myReviews: [
              {
                id: 1,
                boardGame: {
                  id: 1,
                  name: "테라포밍 마스:익스페디션",
                  imageUrl: "no-image",
                  averageRating: 4.64,
                },
              },
              {
                id: 2,
                boardGame: {
                  id: 1,
                  name: "테라포밍 마스:익스페디션",
                  imageUrl: "no-image",
                  averageRating: 4.64,
                },
              },
              {
                id: 3,
                boardGame: {
                  id: 1,
                  name: "테라포밍 마스:익스페디션",
                  imageUrl: "no-image",
                  averageRating: 4.64,
                },
              },
              {
                id: 4,
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
    getMyReviews: build.query<Paginated<ReviewSummary>, {page: number}>({
      queryFn: () => ({
        data: {
          hasNext: true,
          content: [
            {
              id: 1,
              boardGame: {
                id: 1,
                name: "테라포밍 마스:익스페디션",
                imageUrl: "no-image",
                averageRating: 4.64,
              },
            },
            {
              id: 2,
              boardGame: {
                id: 1,
                name: "테라포밍 마스:익스페디션",
                imageUrl: "no-image",
                averageRating: 4.64,
              },
            },
            {
              id: 3,
              boardGame: {
                id: 1,
                name: "테라포밍 마스:익스페디션",
                imageUrl: "no-image",
                averageRating: 4.64,
              },
            },
            {
              id: 4,
              boardGame: {
                id: 1,
                name: "테라포밍 마스:익스페디션",
                imageUrl: "no-image",
                averageRating: 4.64,
              },
            },
            {
              id: 5,
              boardGame: {
                id: 1,
                name: "테라포밍 마스:익스페디션",
                imageUrl: "no-image",
                averageRating: 4.64,
              },
            },
            {
              id: 6,
              boardGame: {
                id: 1,
                name: "테라포밍 마스:익스페디션",
                imageUrl: "no-image",
                averageRating: 4.64,
              },
            },
            {
              id: 7,
              boardGame: {
                id: 1,
                name: "테라포밍 마스:익스페디션",
                imageUrl: "no-image",
                averageRating: 4.64,
              },
            },
            {
              id: 8,
              boardGame: {
                id: 1,
                name: "테라포밍 마스:익스페디션",
                imageUrl: "no-image",
                averageRating: 4.64,
              },
            },
            {
              id: 9,
              boardGame: {
                id: 1,
                name: "테라포밍 마스:익스페디션",
                imageUrl: "no-image",
                averageRating: 4.64,
              },
            },
            {
              id: 10,
              boardGame: {
                id: 1,
                name: "테라포밍 마스:익스페디션",
                imageUrl: "no-image",
                averageRating: 4.64,
              },
            },
          ] as ReviewSummary[],
        },
      }),
      serializeQueryArgs: ({endpointName}) => endpointName,
      merge: (currentCacheData, responseData, {arg}) => {
        if (arg.page > 1) {
          currentCacheData.hasNext = responseData.hasNext;
          currentCacheData.content.push(...responseData.content);
          return currentCacheData;
        }
        return responseData;
      },
      forceRefetch: ({currentArg, previousArg}) => currentArg !== previousArg,
    }),
    getFavoriteBoardGames: build.query<Paginated<BoardGameSummary>, {page: number}>({
      queryFn: () => ({
        data: {
          hasNext: true,
          content: [
            {id: 1, name: "테라포밍 마스:익스페디션", imageUrl: "no-image", averageRating: 4.64},
            {id: 2, name: "글룸헤이븐", imageUrl: "no-image", averageRating: 4.64},
            {id: 3, name: "한밤의 늑대인간", imageUrl: "no-image", averageRating: 4.64},
            {id: 4, name: "테라포밍 마스:익스페디션", imageUrl: "no-image", averageRating: 4.64},
            {id: 5, name: "글룸헤이븐", imageUrl: "no-image", averageRating: 4.64},
            {id: 6, name: "한밤의 늑대인간", imageUrl: "no-image", averageRating: 4.64},
            {id: 7, name: "한밤의 늑대인간", imageUrl: "no-image", averageRating: 4.64},
            {id: 8, name: "테라포밍 마스:익스페디션", imageUrl: "no-image", averageRating: 4.64},
            {id: 9, name: "글룸헤이븐", imageUrl: "no-image", averageRating: 4.64},
            {id: 10, name: "한밤의 늑대인간", imageUrl: "no-image", averageRating: 4.64},
          ],
        },
      }),
      serializeQueryArgs: ({endpointName}) => endpointName,
      merge: (currentCacheData, responseData, {arg}) => {
        if (arg.page > 1) {
          currentCacheData.hasNext = responseData.hasNext;
          currentCacheData.content.push(...responseData.content);
          return currentCacheData;
        }
        return responseData;
      },
      forceRefetch: ({currentArg, previousArg}) => currentArg !== previousArg,
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
  useGetMyReviewsQuery,
  useGetFavoriteBoardGamesQuery,
} = OTBApi;
