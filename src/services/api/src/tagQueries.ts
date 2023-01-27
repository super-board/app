export type Tag = {
  id: number;
  name: string;
};

export type TagGroup = {
  type: string;
  tags: Tag[];
};

export const tagQueries = {
  getTags: {
    queryFn() {
      return {
        data: [
          {
            type: "인원",
            tags: [
              {id: 1, name: "2인"},
              {id: 2, name: "3인"},
              {id: 3, name: "4인"},
              {id: 4, name: "5인"},
              {id: 5, name: "6인 이상"},
            ],
          },
          {
            type: "장르",
            tags: [
              {id: 6, name: "협동"},
              {id: 7, name: "카드"},
              {id: 8, name: "추리"},
              {id: 9, name: "탐험"},
              {id: 10, name: "퍼즐"},
              {id: 11, name: "음악/미술"},
              {id: 12, name: "추상전략"},
              {id: 13, name: "SF"},
              {id: 14, name: "판타지"},
              {id: 15, name: "호러"},
              {id: 16, name: "전쟁"},
            ],
          },
          {
            type: "난이도",
            tags: [
              {id: 17, name: "쉬움"},
              {id: 18, name: "보통"},
              {id: 19, name: "어려움"},
            ],
          },
        ],
      };
    },
  },
};
