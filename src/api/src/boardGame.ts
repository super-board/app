import {BoardGameDetails, BoardGameSummary, Paginated} from "@/types";

import {axiosAuthenticated, axiosPublic} from "./config";
import {boardGamesSearchResult} from "./dummies/boardGameList";

export async function fetchBoardGamesTop10() {
  return axiosPublic.get<unknown, BoardGameSummary[]>("boardgames/top10");
}

export async function fetchBoardGamesCuration(
  tagIds: number[],
): Promise<Paginated<BoardGameSummary>> {
  return new Promise(resolve => resolve(boardGamesSearchResult));
}

export async function fetchBoardGames(): Promise<Paginated<BoardGameSummary>> {
  return new Promise(resolve => resolve(boardGamesSearchResult));
}

export async function fetchBoardGameDetailsPublic(id: number) {
  return axiosPublic.get<unknown, BoardGameDetails>(`boardgames/${id}`);
}

export async function fetchBoardGameDetailsAuthenticated(id: number) {
  return axiosAuthenticated.get<unknown, BoardGameDetails>(`boardgames/${id}`);
}
