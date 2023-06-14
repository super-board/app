export type Paginated<T> = {
  pageInfo: {hasNext: boolean};
  content: T[];
};

export type PaginationParams = {
  limit?: number;
  offset?: number;
};

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
  image: string;
  grade: number;
};

export type BoardGameDetails = BoardGameSummary & {
  description: string;
  favoriteCount: number;
  tagList: Tag[];
  isLiked: boolean;
};

export type ReviewForm = {
  content: string;
  grade: number;
  images: string[];
};

export type BestReview = {
  id: number;
  content: string;
  grade: number;
  writerNickname: string;
  writerLevel: Level;
  profileCharacter: ProfileCharacter;
  boardGameTitle: string;
  boardgameImage: string;
  likeCount: number;
};

export type Review = {
  id: number;
  grade: number;
  content: string;
  images: string[];
  likeCount: number;
  commentCount: number;
  isHidden: boolean;
  createdAt: string;
  writerId: number;
  profileCharacter: ProfileCharacter;
  nickname: string;
  writerLevel: Level;
  isLiked: boolean;
};

export type CommentDetails = {
  id: number;
  createdAt: string;
  content: string;
  isHidden: boolean;
  nickname: string;
  profileCharacter: ProfileCharacter;
  writerId: number;
  writerLevel: Level;
};

export type MemberSummary = {
  id: number;
  nickname: string;
  level: Level;
  profileCharacter: ProfileCharacter;
};

export type MemberDetails = MemberSummary & {
  email: string;
  point: number;
  role: MemberRole;
  isSocial: boolean;
  badges: BadgeType[];
};

export type MemberRole = "ROLE_ADMIN" | "ROLE_USER";

export type Level = "PLAYER" | "CLOVER" | "HEART" | "DIAMOND" | "SPADE" | "JOKER";

export type Notification = {
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

export type MyPageDetails = {
  nickname: string;
  level: Level;
  point: number;
  profileCharacter: ProfileCharacter;
  favoriteTags: Tag[];
  favoriteBoardgames: FavoriteBoardGame[];
  myReviews: MyReview[];
};

export type MyReview = {
  id: number;
  boardGameId: number;
  boardGameName: string;
  boardGameImage: string;
};

export type FavoriteBoardGame = {
  id: number;
  name: string;
  image: string;
};

export type BadgeType =
  | "JOIN"
  | "POST_FIRST_REVIEW"
  | "POST_FIVE_REVIEWS"
  | "ATTEND_SEVEN_DAYS"
  | "ATTEND_THIRTY_DAYS"
  | "SET_PROFILE_CHARACTER"
  | "SET_PUSH_ALARM_ON"
  | "POST_FIVE_COMMENTS"
  | "SELECTED_RECOMMENDED_REVIEW"
  | "GAIN_TEN_REVIEW_LIKES";

export type Notice = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  admin: string;
};

export type Inquiry = {
  id: number;
  title: string;
  createdAt: string;
  answeredAt: string;
  content: string;
  answer: string;
  adminEmail: string;
  isAnswered: boolean;
};

export type InquiryForm = {
  title: string;
  content: string;
};
