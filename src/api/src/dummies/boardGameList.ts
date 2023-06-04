import {BoardGameDetails, BoardGameSummary, Paginated} from "@/types";

export const boardGamesForHome: BoardGameSummary[] = [
  {
    id: 1,
    name: "테라포밍 마스: 아레스 익스페디션",
    image: "@/assets/images/fallback/board-game-fallback.png",
    averageRating: 4.5,
  },
  {
    id: 2,
    name: "글룸헤이븐",
    image: "assets/images/fallback/board-game-fallback.png",
    averageRating: 3.7,
  },
  {
    id: 3,
    name: "메이지나이트",
    image: "assets/images/fallback/board-game-fallback.png",
    averageRating: 5.0,
  },
  {
    id: 4,
    name: "우드크래프트 Woodcraft",
    image: "assets/images/fallback/board-game-fallback.png",
    averageRating: 4.2,
  },
  {
    id: 5,
    name: "스플렌더",
    image: "assets/images/fallback/board-game-fallback.png",
    averageRating: 3.9,
  },
];

export const boardGamesTop10: BoardGameSummary[] = [
  {
    id: 1,
    name: "테라포밍 마스: 아레스 익스페디션",
    image: "@/assets/images/fallback/board-game-fallback.png",
    averageRating: 3.7,
  },
  {
    id: 2,
    name: "글룸헤이븐",
    image: "assets/images/fallback/board-game-fallback.png",
    averageRating: 2.5,
  },
  {
    id: 3,
    name: "메이지나이트",
    image: "assets/images/fallback/board-game-fallback.png",
    averageRating: 3.7,
  },
  {
    id: 4,
    name: "우드크래프트 Woodcraft",
    image: "assets/images/fallback/board-game-fallback.png",
    averageRating: 5,
  },
  {
    id: 5,
    name: "메이지나이트",
    image: "assets/images/fallback/board-game-fallback.png",
    averageRating: 1.3,
  },
  {
    id: 6,
    name: "테라포밍 마스: 아레스 익스페디션",
    image: "@/assets/images/fallback/board-game-fallback.png",
    averageRating: 3.7,
  },
  {
    id: 7,
    name: "글룸헤이븐",
    image: "assets/images/fallback/board-game-fallback.png",
    averageRating: 2.5,
  },
  {
    id: 8,
    name: "메이지나이트",
    image: "assets/images/fallback/board-game-fallback.png",
    averageRating: 3.7,
  },
  {
    id: 9,
    name: "우드크래프트 Woodcraft",
    image: "assets/images/fallback/board-game-fallback.png",
    averageRating: 5,
  },
  {
    id: 10,
    name: "메이지나이트",
    image: "assets/images/fallback/board-game-fallback.png",
    averageRating: 1.3,
  },
];

export const boardGamesSearchResult: Paginated<BoardGameSummary> = {
  pageInfo: {hasNext: true},
  content: [
    {
      id: 1,
      name: "테라포밍 마스: 아레스 익스페디션",
      image: "@/assets/images/fallback/board-game-fallback.png",
      averageRating: 3.7,
    },
    {
      id: 2,
      name: "글룸헤이븐",
      image: "assets/images/fallback/board-game-fallback.png",
      averageRating: 2.5,
    },
    {
      id: 3,
      name: "메이지나이트",
      image: "assets/images/fallback/board-game-fallback.png",
      averageRating: 3.7,
    },
    {
      id: 4,
      name: "우드크래프트 Woodcraft",
      image: "assets/images/fallback/board-game-fallback.png",
      averageRating: 5,
    },
    {
      id: 5,
      name: "메이지나이트",
      image: "assets/images/fallback/board-game-fallback.png",
      averageRating: 1.3,
    },
    {
      id: 6,
      name: "테라포밍 마스: 아레스 익스페디션",
      image: "@/assets/images/fallback/board-game-fallback.png",
      averageRating: 3.7,
    },
    {
      id: 7,
      name: "글룸헤이븐",
      image: "assets/images/fallback/board-game-fallback.png",
      averageRating: 2.5,
    },
    {
      id: 8,
      name: "메이지나이트",
      image: "assets/images/fallback/board-game-fallback.png",
      averageRating: 3.7,
    },
    {
      id: 9,
      name: "우드크래프트 Woodcraft",
      image: "assets/images/fallback/board-game-fallback.png",
      averageRating: 5,
    },
    {
      id: 10,
      name: "메이지나이트",
      image: "assets/images/fallback/board-game-fallback.png",
      averageRating: 1.3,
    },
  ],
};

export const boardGameDetails: BoardGameDetails = {
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
  image: "assets/images/fallback/board-game-fallback.png",
};
