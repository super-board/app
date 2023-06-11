import {axiosAuthenticated} from "@/api/src/config";
import {Paginated, ReviewDetails, ReviewForm, ReviewSummary} from "@/types";

import {bestReviews, reviews} from "./dummies/reviewList";

export async function fetchBestReviews(): Promise<ReviewSummary[]> {
  return new Promise(resolve => resolve(bestReviews));
}

export async function fetchReviews(): Promise<Paginated<ReviewDetails>> {
  return new Promise(resolve => resolve(reviews));
}

export async function postReview({boardGameId, form}: {boardGameId: number; form: ReviewForm}) {
  return axiosAuthenticated.post(`boardgames/${boardGameId}/reviews`, form);
}
