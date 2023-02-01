import {BoardGameSummary} from "@/services/api/src/types";

export const boardGameQueries = {
  getBoardGamesForHomeCuration: {
    queryFn() {
      return {
        data: [
          {
            id: 1,
            name: "테라포밍 마스: 아레스 익스페디션",
            imageUrl: "@/assets/images/fallback/board-game-fallback.png",
            averageRating: 4.5,
          },
          {
            id: 2,
            name: "글룸헤이븐",
            imageUrl: "assets/images/fallback/board-game-fallback.png",
            averageRating: 3.7,
          },
          {
            id: 3,
            name: "메이지나이트",
            imageUrl: "assets/images/fallback/board-game-fallback.png",
            averageRating: 5.0,
          },
          {
            id: 4,
            name: "우드크래프트 Woodcraft",
            imageUrl: "assets/images/fallback/board-game-fallback.png",
            averageRating: 4.2,
          },
          {
            id: 5,
            name: "스플렌더",
            imageUrl: "assets/images/fallback/board-game-fallback.png",
            averageRating: 3.9,
          },
        ] as BoardGameSummary[],
      };
    },
  },
  getRecommendedBoardGamesByTags: {
    queryFn(arg: {tagIds: number[]; page: number}) {
      return {
        data: [
          {
            id: 1,
            name: "테라포밍 마스: 아레스 익스페디션",
            imageUrl: "@/assets/images/fallback/board-game-fallback.png",
            averageRating: 3.7,
          },
          {
            id: 2,
            name: "글룸헤이븐",
            imageUrl: "assets/images/fallback/board-game-fallback.png",
            averageRating: 2.5,
          },
          {
            id: 3,
            name: "메이지나이트",
            imageUrl: "assets/images/fallback/board-game-fallback.png",
          },
          {
            id: 4,
            name: "우드크래프트 Woodcraft",
            imageUrl: "assets/images/fallback/board-game-fallback.png",
            averageRating: 5,
          },
          {
            id: 5,
            name: "메이지나이트",
            imageUrl: "assets/images/fallback/board-game-fallback.png",
            averageRating: 1.3,
          },
          {
            id: 6,
            name: "테라포밍 마스: 아레스 익스페디션",
            imageUrl: "@/assets/images/fallback/board-game-fallback.png",
            averageRating: 3.7,
          },
          {
            id: 7,
            name: "글룸헤이븐",
            imageUrl: "assets/images/fallback/board-game-fallback.png",
            averageRating: 2.5,
          },
          {
            id: 8,
            name: "메이지나이트",
            imageUrl: "assets/images/fallback/board-game-fallback.png",
          },
          {
            id: 9,
            name: "우드크래프트 Woodcraft",
            imageUrl: "assets/images/fallback/board-game-fallback.png",
            averageRating: 5,
          },
          {
            id: 10,
            name: "메이지나이트",
            imageUrl: "assets/images/fallback/board-game-fallback.png",
            averageRating: 1.3,
          },
        ] as BoardGameSummary[],
      };
    },
  },
};
