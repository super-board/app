import {Paginated, ReviewDetails, ReviewSummary} from "@/types";

import {bestReviews, reviews} from "./dummies/reviewList";

export async function fetchBestReviews(): Promise<ReviewSummary[]> {
  return new Promise(resolve => resolve(bestReviews));
}

export async function fetchReviews(): Promise<Paginated<ReviewDetails>> {
  return new Promise(resolve => resolve(reviews));
}
