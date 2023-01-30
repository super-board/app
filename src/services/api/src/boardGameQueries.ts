export type BoardGameSummary = {
  id: number;
  name: string;
  imageUrl: string;
};

export const boardGameQueries = {
  getRecommendedBoardGamesByTags: {
    queryFn() {
      return {
        data: [
          {
            id: 1,
            name: "테라포밍 마스: 아레스 익스페디션",
            imageUrl: "@/assets/images/fallback/board-game-fallback.png",
          },
          {id: 2, name: "글룸헤이븐", imageUrl: "assets/images/fallback/board-game-fallback.png"},
          {
            id: 3,
            name: "메이지나이트",
            imageUrl: "assets/images/fallback/board-game-fallback.png",
          },
          {
            id: 4,
            name: "메이지나이트",
            imageUrl: "assets/images/fallback/board-game-fallback.png",
          },
          {
            id: 5,
            name: "메이지나이트",
            imageUrl: "assets/images/fallback/board-game-fallback.png",
          },
        ],
      };
    },
  },
};
