import React from "react";

import {useInfiniteQuery} from "@tanstack/react-query";
import {View} from "react-native";

import {api} from "@/api";
import {BoardGameGridListView, SizedBox} from "@/components";
import style from "@/constants/style";

export default function MyReviewsScreen() {
  const {data, hasNextPage, fetchNextPage} = useInfiniteQuery(
    ["members/mypage/reviews"],
    ({pageParam = 0}) => api.myPage.fetchMyReviews({limit: 10, offset: 10 * pageParam + 1}),
    {getNextPageParam: lastPage => lastPage.pageInfo.hasNext},
  );
  const boardGames = data?.pages.flatMap(page =>
    page.content.map(review => ({
      id: review.boardGameId,
      name: review.boardGameName,
      image: review.boardGameImage,
    })),
  );

  const onLoadNextPage = () => fetchNextPage({pageParam: data!.pageParams.length});

  if (!data) return <View style={style.screenWithAppBarContainer} />;

  return (
    <View style={style.screenWithAppBarContainer}>
      <SizedBox height={8} />
      <BoardGameGridListView
        boardGames={boardGames ?? []}
        hasNextPage={hasNextPage}
        onLoadNextPage={onLoadNextPage}
      />
    </View>
  );
}
