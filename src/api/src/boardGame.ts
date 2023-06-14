import {BoardGameDetails, BoardGameSummary, Paginated, PaginationParams} from "@/types";

import {axiosAuthenticated, axiosPublic} from "./config";

export async function fetchBoardGamesTop10() {
  return axiosPublic.get<unknown, BoardGameSummary[]>("boardgames/top10");
}

export async function fetchBoardGamesCuration({
  tagIds,
  limit = 10,
  offset = 1,
}: {
  tagIds: number[];
} & PaginationParams) {
  return axiosPublic.get<unknown, Paginated<BoardGameSummary>>("boardgames/curation", {
    params: {limit, offset},
    data: {tagIds},
  });
}

export async function fetchBoardGames({
  query,
  limit = 10,
  offset = 1,
}: {query: string} & PaginationParams) {
  return axiosPublic.get<unknown, Paginated<BoardGameSummary>>("boardgames/searchBoardgameList", {
    params: {limit, offset, name: query},
  });
}

export async function fetchBoardGameDetailsPublic(id: number) {
  return axiosPublic.get<unknown, BoardGameDetails>(`boardgames/${id}`);
}

export async function fetchBoardGameDetailsAuthenticated(id: number) {
  return axiosAuthenticated.get<unknown, BoardGameDetails>(`boardgames/${id}`);
}
