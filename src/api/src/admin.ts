import {InquiryAdmin, NoticeForm, Paginated, PaginationParams} from "@/types";

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
