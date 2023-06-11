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

export async function toggleCommentId({
  boardGameId,
  reviewId,
  commentId,
}: {
  boardGameId: number;
  reviewId: number;
  commentId: number;
}) {
  return axiosAuthenticated.post(
    `boardgames/${boardGameId}/reviews/${reviewId}/Comments/${commentId}/likes`,
  );
}
