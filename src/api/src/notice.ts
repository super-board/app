import {axiosAuthenticated} from "@/api/src/config";
import {Notice, Paginated} from "@/types";

export async function fetchNotices() {
  return axiosAuthenticated.get<unknown, Paginated<Notice>>("notices");
}
