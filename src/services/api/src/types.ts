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

export type ProfileCharacter =
  | "PROFILE_1"
  | "PROFILE_2"
  | "PROFILE_3"
  | "PROFILE_4"
  | "PROFILE_5"
  | "PROFILE_6"
  | "PROFILE_7"
  | "PROFILE_8"
  | "PROFILE_9";
