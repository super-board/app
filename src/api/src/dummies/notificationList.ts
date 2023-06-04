import {Notification} from "@/types";

export const notificationList: Notification[] = [
  {
    id: 1,
    message: "내가 작성한 리뷰에 댓글이 달렸어요!",
    createdAt: new Date().toISOString(),
    isSeen: false,
  },
  {
    id: 2,
    message: "내가 작성한 리뷰에 댓글이 달렸어요!",
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    isSeen: false,
  },
  {
    id: 3,
    message: "[#태그]에 새로운 게임이 추가되었어요!",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    isSeen: false,
  },
  {
    id: 4,
    message: "[#태그]에 새로운 게임이 추가되었어요!",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    isSeen: true,
  },
];
