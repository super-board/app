import {CommentDetails, Paginated, PaginationParams} from "@/types";

import {axiosAuthenticated, axiosPublic} from "./config";

export async function fetchComments({
  boardGameId,
  reviewId,
  limit = 3,
  offset = 1,
}: {boardGameId: number; reviewId: number} & PaginationParams) {
  return axiosPublic.get<unknown, Paginated<CommentDetails>>(
    `boardgames/${boardGameId}/reviews/${reviewId}/comments`,
    {params: {limit, offset}},
  );
}

export async function postComment({
  boardGameId,
  reviewId,
  content,
}: {
  boardGameId: number;
  reviewId: number;
  content: string;
}) {
  return axiosAuthenticated.post(`boardgames/${boardGameId}/reviews/${reviewId}/comments`, {
    content,
  });
}

export async function updateComment({
  boardGameId,
  reviewId,
  commentId,
  content,
}: {
  boardGameId: number;
  reviewId: number;
  commentId: number;
  content: string;
}) {
  return axiosAuthenticated.patch(
    `boardgames/${boardGameId}/reviews/${reviewId}/comments/${commentId}`,
    {
      content,
    },
  );
}

export async function deleteComment({
  boardGameId,
  reviewId,
  commentId,
}: {
  boardGameId: number;
  reviewId: number;
  commentId: number;
}) {
  return axiosAuthenticated.delete(
    `boardgames/${boardGameId}/reviews/${reviewId}/comments/${commentId}`,
  );
}
