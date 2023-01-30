import {Notifications} from "./types";

export const notificationsQuery = {
  getRecentNotifications: {
    queryFn() {
      return {
        data: [
          {
            id: 1,
            message: "내가 작성한 리뷰에 댓글이 달렸어요!",
            createdAt: new Date(),
            isSeen: false,
          },
          {
            id: 2,
            message: "내가 작성한 리뷰에 댓글이 달렸어요!",
            createdAt: new Date(Date.now() - 60 * 1000),
            isSeen: false,
          },
          {
            id: 3,
            message: "[#태그]에 새로운 게임이 추가되었어요!",
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 1000),
            isSeen: false,
          },
          {
            id: 4,
            message: "[#태그]에 새로운 게임이 추가되었어요!",
            createdAt: new Date(Date.now() - 8 * 24 * 60 * 1000),
            isSeen: true,
          },
        ] as Notifications[],
      };
    },
  },
};
