export type Tag = {
  id: number;
  name: string;
  type: string;
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

export type BoardGameDetails = {
  id: number;
  name: string;
  description: string;
  image: string;
  favoriteCount: number;
  averageRating: number;
  tagList: Tag[];
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

export type ReviewDetails = {
  id: number;
  createdAt: string;
  content: string;
  rating: number;
  images: string[];
  commentCount: number;
  likeCount: number;
  author: MemberSummary;
};

export type PaginatedReviews = {
  hasNext: boolean;
  reviews: ReviewDetails[];
};

export type CommentDetails = {
  id: number;
  createdAt: string;
  content: string;
  author: MemberSummary;
};

export type PaginatedComments = {
  hasNext: boolean;
  comments: CommentDetails[];
};

export type MemberSummary = {
  id: number;
  nickname: string;
  level: Level;
  profileCharacter: ProfileCharacter;
};

export type MemberDetails = MemberSummary & {email: string; role: MemberRole};

export type MemberRole = "ADMIN" | "USER";

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

export type RegisterForm = {
  email: string;
  password: string;
  profileCharacter: string;
  nickname: string;
  tagIds: number[];
};

export type LoginForm = {
  email: string;
  password: string;
};

export type ResetPasswordForm = LoginForm & {resetToken: string};
