import {axiosAuthenticated} from "./config";

export async function hideReview(reviewId: number) {
  return axiosAuthenticated.patch(`admin/reviews/${reviewId}`);
}

export async function hideComment(commentId: number) {
  return axiosAuthenticated.patch(`admin/comments/${commentId}`);
}
