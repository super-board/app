import React, {useState} from "react";

import {View} from "react-native";

import {BoardGameGridListView} from "@/components";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import {useGetFavoriteBoardGamesQuery} from "@/store";

export default function FavoriteBoardGamesScreen({navigation}: ScreenProps) {
  const [page, setPage] = useState(1);
  const {isLoading, data: paginatedBoardGames} = useGetFavoriteBoardGamesQuery({page});

  const onLoadNextPage = () => {
    setPage(state => state + 1);
  };

  if (isLoading || !paginatedBoardGames) return <View style={style.screenWithAppBarContainer} />;

  return (
    <View style={style.screenWithAppBarContainer}>
      <BoardGameGridListView
        boardGames={paginatedBoardGames.content}
        hasNextPage={paginatedBoardGames.hasNext}
        onLoadNextPage={onLoadNextPage}
      />
    </View>
  );
}
