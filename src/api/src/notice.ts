import {axiosAuthenticated} from "@/api/src/config";
import {Notice, Paginated, PaginationParams} from "@/types";

export async function fetchNotices({limit = 10, offset = 1}: PaginationParams) {
  return axiosAuthenticated.get<unknown, Paginated<Notice>>("notices", {params: {limit, offset}});
}
