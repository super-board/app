export type Tag = {
  id: number;
  name: string;
};

export type TagGroup = {
  type: string;
  tags: Tag[];
};

export type BoardGameSummary = {
  id: number;
  name: string;
  imageUrl: string;
  averageRating: number;
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
  rating: number;
};

export type Level = "PLAYER" | "CLOVER" | "HEART" | "DIAMOND" | "SPADE" | "JOKER";

export type Notifications = {
  id: number;
  message: string;
  createdAt: string;
  isSeen: boolean;
};

export type EmailVerificationPayload = {
  clientKey: string;
  authCode: string;
};
