import {ReviewSummary} from "@/services/api/src/types";

export const reviewQueries = {
  getBestReviews: {
    queryFn() {
      return {
        data: [
          {
            id: 1,
            title:
              "머지않아 여기를 고향이라고 부르는 온더보더들이 태어날 것입니다. 더 긴 제목을 넣어 생략되는 지 확인.",
            boardGame: {
              id: 1,
              name: "테라포밍 마스: 아레스 익스페디션",
              imageUrl: "@/assets/images/fallback/board-game-fallback.png",
            },
            author: {
              id: 1,
              nickname: "Margo",
              level: "DIAMOND",
            },
            rating: 4.5,
          },
          {
            id: 2,
            title: "5분 같았던 5시간이었다.",
            boardGame: {
              id: 2,
              name: "메이지나이트",
              imageUrl: "@/assets/images/fallback/board-game-fallback.png",
            },
            author: {
              id: 2,
              nickname: "yeay",
              level: "HEART",
            },
            rating: 3.5,
          },
          {
            id: 3,
            title: "이거 추천해준 놈 누구냐...",
            boardGame: {
              id: 3,
              name: "우드크래프트 Woodcraft",
              imageUrl: "@/assets/images/fallback/board-game-fallback.png",
            },
            author: {
              id: 3,
              nickname: "abcdefg1234",
              level: "SPADE",
            },
            rating: 0.5,
          },
          {
            id: 4,
            title: "연휴동안 보드게임만 10종류했는데 이게 제일 재밌었음",
            boardGame: {
              id: 2,
              name: "메이지나이트",
              imageUrl: "@/assets/images/fallback/board-game-fallback.png",
            },
            author: {
              id: 4,
              nickname: "미쳤습니까휴먼",
              level: "CLOVER",
            },
            rating: 5,
          },
          {
            id: 5,
            title: "친구없는 애들은 클릭 ㄴㄴ",
            boardGame: {
              id: 2,
              name: "클루",
              imageUrl: "@/assets/images/fallback/board-game-fallback.png",
            },
            author: {
              id: 5,
              nickname: "그게나야",
              level: "SPADE",
            },
            rating: 2.5,
          },
          {
            id: 6,
            title:
              "머지않아 여기를 고향이라고 부르는 온더보더들이 태어날 것입니다. 더 긴 제목을 넣어 생략되는 지 확인.",
            boardGame: {
              id: 1,
              name: "테라포밍 마스: 아레스 익스페디션",
              imageUrl: "@/assets/images/fallback/board-game-fallback.png",
            },
            author: {
              id: 1,
              nickname: "Margo",
              level: "DIAMOND",
            },
            rating: 4.5,
          },
          {
            id: 7,
            title: "5분 같았던 5시간이었다.",
            boardGame: {
              id: 2,
              name: "메이지나이트",
              imageUrl: "@/assets/images/fallback/board-game-fallback.png",
            },
            author: {
              id: 2,
              nickname: "yeay",
              level: "HEART",
            },
            rating: 3.5,
          },
          {
            id: 8,
            title: "이거 추천해준 놈 누구냐...",
            boardGame: {
              id: 3,
              name: "우드크래프트 Woodcraft",
              imageUrl: "@/assets/images/fallback/board-game-fallback.png",
            },
            author: {
              id: 3,
              nickname: "abcdefg1234",
              level: "SPADE",
            },
            rating: 0.5,
          },
          {
            id: 9,
            title: "연휴동안 보드게임만 10종류했는데 이게 제일 재밌었음",
            boardGame: {
              id: 2,
              name: "메이지나이트",
              imageUrl: "@/assets/images/fallback/board-game-fallback.png",
            },
            author: {
              id: 4,
              nickname: "미쳤습니까휴먼",
              level: "CLOVER",
            },
            rating: 5,
          },
          {
            id: 10,
            title: "친구없는 애들은 클릭 ㄴㄴ",
            boardGame: {
              id: 2,
              name: "클루",
              imageUrl: "@/assets/images/fallback/board-game-fallback.png",
            },
            author: {
              id: 5,
              nickname: "그게나야",
              level: "SPADE",
            },
            rating: 2.5,
          },
        ] as ReviewSummary[],
      };
    },
  },
};
