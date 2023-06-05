import React, {useState} from "react";

import {View} from "react-native";

import {api} from "@/api";
import {BoardGameGridListView} from "@/components";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import {useRefetchQuery} from "@/hooks";

export default function MyReviewsScreen({navigation}: ScreenProps) {
  const [page, setPage] = useState(1);
  const {isLoading, data: paginatedMyReviews} = useRefetchQuery(["members/mypage/reviews"], () =>
    api.myPage.fetchMyReviews({}),
  );
  const boardGames = paginatedMyReviews?.content.map(review => ({
    id: review.boardGameId,
    name: review.boardGameName,
    image: review.boardGameImage,
  }));

  const onLoadNextPage = () => {
    setPage(state => state + 1);
  };

  if (isLoading || !paginatedMyReviews) return <View style={style.screenWithAppBarContainer} />;

  return (
    <View style={style.screenWithAppBarContainer}>
      <BoardGameGridListView
        boardGames={boardGames ?? []}
        hasNextPage={paginatedMyReviews.pageInfo.hasNext}
        onLoadNextPage={onLoadNextPage}
      />
    </View>
  );
}
