import React, {useState} from "react";

import {View} from "react-native";

import {BoardGameGridListView} from "@/components";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import {useGetMyReviewsQuery} from "@/store";

export default function MyReviewsScreen({navigation}: ScreenProps) {
  const [page, setPage] = useState(1);
  const {isLoading, data: paginatedMyReviews} = useGetMyReviewsQuery({page});
  const boardGames = paginatedMyReviews?.content.map(review => review.boardGame);

  const onLoadNextPage = () => {
    setPage(state => state + 1);
  };

  if (isLoading || !paginatedMyReviews) return <View style={style.screenWithAppBarContainer} />;

  return (
    <View style={style.screenWithAppBarContainer}>
      <BoardGameGridListView
        boardGames={boardGames ?? []}
        hasNextPage={paginatedMyReviews.hasNext}
        onLoadNextPage={onLoadNextPage}
      />
    </View>
  );
}
