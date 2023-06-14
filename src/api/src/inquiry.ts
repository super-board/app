import {axiosAuthenticated} from "@/api/src/config";
import {Inquiry, InquiryForm, Paginated, PaginationParams} from "@/types";

export async function fetchInquiries({limit = 10, offset = 1}: PaginationParams) {
  return axiosAuthenticated.get<unknown, Paginated<Inquiry>>("inquiries", {
    params: {limit, offset},
  });
}

export async function postInquiry(payload: InquiryForm) {
  return axiosAuthenticated.post("inquiries", payload);
}
