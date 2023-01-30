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
    level: string;
  };
  grade: number;
};
