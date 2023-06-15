import {axiosAuthenticated} from "./config";

export async function toggleReviewLike({
  boardGameId,
  reviewId,
}: {
  boardGameId: number;
  reviewId: number;
}) {
  return axiosAuthenticated.post(`boardgames/${boardGameId}/reviews/${reviewId}/likes`);
}

export async function toggleBoardGameLike({boardGameId}: {boardGameId: number}) {
  return axiosAuthenticated.post(`boardgames/${boardGameId}/likes`);
}
