export type BoardGameSummary = {
  id: number;
  name: string;
  imageUrl: string;
};

export type ReviewSummary = {
  id: number;
  title: string;
  boardGame: BoardGameSummary;
  author: {
    id: number;
    nickname: string;
    level: Level;
  };
  grade: Rating;
};

export type Level = "PLAYER" | "CLOVER" | "HEART" | "DIAMOND" | "SPADE" | "JOKER";

export type Rating = 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
