import {BoardGameDetails, BoardGameSummary, Paginated} from "@/types";

import {axiosPublic} from "./config";
import {boardGameDetails, boardGamesSearchResult} from "./dummies/boardGameList";

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

export async function fetchBoardGameDetails(id: number): Promise<BoardGameDetails> {
  return new Promise(resolve => resolve(boardGameDetails));
}
