import {axiosAuthenticated} from "@/api/src/config";
import {
  FavoriteBoardGame,
  MyPageDetails,
  MyReview,
  Paginated,
  PaginationParams,
  ProfileCharacter,
} from "@/types";

export async function fetchDetails() {
  return axiosAuthenticated.get<unknown, MyPageDetails>("members/mypage", {
    params: {boardgameCount: 3 + 1, reviewCount: 3 + 1},
  });
}

export async function fetchFavoriteBoardGames({limit = 10, offset = 1}: PaginationParams) {
  return axiosAuthenticated.get<unknown, Paginated<FavoriteBoardGame>>(
    "members/mypage/favorite-boardgames",
    {params: {limit, offset}},
  );
}

export async function fetchMyReviews({limit = 10, offset = 1}: PaginationParams) {
  return axiosAuthenticated.get<unknown, Paginated<MyReview>>("members/mypage/reviews", {
    params: {limit, offset},
  });
}

export async function resetFavoriteTags(tagIds: number[]) {
  return axiosAuthenticated.patch("members/mypage/favorite-tags", {tagIds});
}

export async function resetPassword(password: string) {
  return axiosAuthenticated.patch("members/mypage/password", {password});
}

export async function updateProfile(payload: {
  nickname: string;
  profileCharacter: ProfileCharacter;
}) {
  return axiosAuthenticated.patch("members/mypage/profile", payload);
}

export async function withdrawAccount() {
  return axiosAuthenticated.patch("members/mypage/withdrawal");
}
