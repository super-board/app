import React, {useState} from "react";

import {View} from "react-native";

import {api} from "@/api";
import {BoardGameGridListView} from "@/components";
import style from "@/constants/style";
import {useRefetchQuery} from "@/hooks";

export default function FavoriteBoardGamesScreen() {
  const [page, setPage] = useState(1);
  const {isLoading, data: paginatedBoardGames} = useRefetchQuery(
    ["members/mypage/favorite-boardgames"],
    () => api.myPage.fetchFavoriteBoardGames({}),
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
