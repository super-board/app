import {BoardGameDetails, BoardGameSummary} from "../types";

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
  getTop10BoardGames: {
    queryFn() {
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
  getBoardGamesByName: {
    queryFn(arg: {query: string; page: number}) {
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
  getBoardGameDetails: {
    queryFn: (id: number) => {
      return {
        data: {
          id: 1,
          name: "테라포밍 마스:아레스 익스페디션",
          description:
            '2315년, 지구의 자원이 고갈되어 인류의 미래가 위협받고 있다고 판단한 세계정부는 화성진출계획을 발표한다. 누구든 화성 테라포밍에 나선다면, 세계정부는 전 지구에서 걷은 세금으로 자금을 지원해주겠다는 선언도 함께. 플레이어들은 각자 초거대기업의 총수가 되어 "프로젝트 테라포밍 마스"에 참가하여 화성을 개척하고 돈을 벌어 가장 크게 성장한(승점을 제일 많이 얻는) 기업가가 되는 것이 목표다.',
          favoriteCount: 1023,
          averageRating: 4.65,
          tagList: [
            {id: 1, name: "2인-4인", type: "PLAYERS"},
            {id: 2, name: "30분", type: "PLAY_TIME"},
            {id: 3, name: "6세+", type: "AGE"},
            {id: 4, name: "카드게임", type: "CATEGORY"},
          ],
        } as BoardGameDetails,
      };
    },
  },
};
