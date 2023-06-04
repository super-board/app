import React, {useState} from "react";

import {useQuery} from "@tanstack/react-query";
import {View} from "react-native";

import {api} from "@/api";
import {BoardGameGridListView} from "@/components";
import style from "@/constants/style";

export default function FavoriteBoardGamesScreen() {
  const [page, setPage] = useState(1);
  const {isLoading, data: paginatedBoardGames} = useQuery(
    ["members/mypage/favorite-boardgames"],
    api.myPage.fetchFavoriteBoardGames,
  );

  const onLoadNextPage = () => {
    setPage(state => state + 1);
  };

  if (isLoading || !paginatedBoardGames) return <View style={style.screenWithAppBarContainer} />;

  return (
    <View style={style.screenWithAppBarContainer}>
      <BoardGameGridListView
        boardGames={paginatedBoardGames.content}
        hasNextPage={paginatedBoardGames.pageInfo.hasNext}
        onLoadNextPage={onLoadNextPage}
      />
    </View>
  );
}
