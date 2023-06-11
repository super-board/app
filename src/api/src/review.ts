import {axiosAuthenticated, axiosPublic} from "@/api/src/config";
import {BestReview, Paginated, PaginationParams, Review, ReviewForm} from "@/types";

export async function fetchBestReviews() {
  return axiosPublic.get<unknown, Paginated<BestReview>>("reviews/curation", {
    params: {limit: 10, offset: 1},
  });
}

export async function fetchReviewsPublic({
  boardGameId,
  limit = 3,
  offset = 1,
}: {boardGameId: number} & PaginationParams) {
  return axiosPublic.get<unknown, Paginated<Review>>(`boardgames/${boardGameId}/reviews`, {
    params: {limit, offset, orderBy: "REVIEW_NEWEST"},
  });
}

export async function fetchReviewsAuthenticated({
  boardGameId,
  limit = 3,
  offset = 1,
}: {boardGameId: number} & PaginationParams) {
  return axiosAuthenticated.get<unknown, Paginated<Review>>(`boardgames/${boardGameId}/reviews`, {
    params: {limit, offset, orderBy: "REVIEW_NEWEST"},
  });
}

export async function postReview({boardGameId, form}: {boardGameId: number; form: ReviewForm}) {
  return axiosAuthenticated.post(`boardgames/${boardGameId}/reviews`, form);
}
