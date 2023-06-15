import {
  CommentAdmin,
  InquiryAdmin,
  NoticeForm,
  Paginated,
  PaginationParams,
  Report,
  ReviewAdmin,
} from "@/types";

import {axiosAuthenticated} from "./config";

export async function hideReview(reviewId: number) {
  return axiosAuthenticated.patch(`admin/reviews/${reviewId}`);
}

export async function hideComment(commentId: number) {
  return axiosAuthenticated.patch(`admin/comments/${commentId}`);
}

export async function postNotice(form: NoticeForm) {
  return axiosAuthenticated.post("admin/notices", form);
}

export async function fetchInquiries({limit = 10, offset = 1}: PaginationParams) {
  return axiosAuthenticated.get<unknown, Paginated<InquiryAdmin>>("admin/inquiries", {
    params: {limit, offset},
  });
}

export async function answerInquiry({id, answer}: {id: number; answer: string}) {
  return axiosAuthenticated.patch(`admin/inquiries/${id}`, {answer});
}

export async function fetchReviews({limit = 10, offset = 1}: PaginationParams) {
  return axiosAuthenticated.get<unknown, Paginated<ReviewAdmin>>("admin/reviews", {
    params: {limit, offset},
  });
}

export async function fetchComments({limit = 10, offset = 1}: PaginationParams) {
  return axiosAuthenticated.get<unknown, Paginated<CommentAdmin>>("admin/comments", {
    params: {limit, offset},
  });
}

export async function fetchReports({limit = 10, offset = 1}: PaginationParams) {
  return axiosAuthenticated.get<unknown, Paginated<Report>>("admin/reports", {
    params: {limit, offset},
  });
}

export async function resolveReport(id: number) {
  return axiosAuthenticated.patch(`admin/reports/${id}`);
}
