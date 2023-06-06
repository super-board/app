import {axiosAuthenticated} from "@/api/src/config";
import {Inquiry, InquiryForm, Paginated} from "@/types";

export async function fetchInquiries() {
  return axiosAuthenticated.get<unknown, Paginated<Inquiry>>("inquiries");
}

export async function postInquiry(payload: InquiryForm) {
  return axiosAuthenticated.post("inquiries", payload);
}
