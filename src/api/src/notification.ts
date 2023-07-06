import {axiosAuthenticated} from "@/api/src/config";
import {Notification, NotificationResponse, Paginated, PaginationParams} from "@/types";

export async function fetchNotifications({
  limit = 10,
  offset = 1,
}: PaginationParams): Promise<Paginated<Notification>> {
  const data = await axiosAuthenticated.get<unknown, Paginated<NotificationResponse>>(
    "notifications",
    {params: {limit, offset}},
  );
  return {
    pageInfo: data.pageInfo,
    content: data.content.map(notification => ({
      ...notification,
      payload: JSON.parse(notification.payload),
    })),
  };
}

export async function checkNotification(id: number) {
  return axiosAuthenticated.patch(`notifications/${id}`);
}
