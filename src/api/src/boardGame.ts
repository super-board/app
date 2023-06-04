import {BoardGameDetails, BoardGameSummary, Paginated} from "@/types";

import {
  boardGameDetails,
  boardGamesForHome,
  boardGamesSearchResult,
  boardGamesTop10,
} from "./dummies/boardGameList";

export async function fetchBoardGamesForHome(): Promise<BoardGameSummary[]> {
  return new Promise(resolve => resolve(boardGamesForHome));
}

export async function fetchBoardGamesTop10(): Promise<BoardGameSummary[]> {
  return new Promise(resolve => resolve(boardGamesTop10));
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
