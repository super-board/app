import React, {useCallback, useState} from "react";

import {useInfiniteQuery} from "@tanstack/react-query";
import {FlatList, View} from "react-native";

import {api} from "@/api";
import style from "@/constants/style";
import {Notice} from "@/types";

import {PostListItem} from "../components";

export default function NoticeScreen() {
  const [page, setPage] = useState(1);
  const {isLoading, data, fetchNextPage} = useInfiniteQuery(
    ["notices"],
    ({pageParam = 0}) => api.notice.fetchNotices({limit: 10, offset: 10 * pageParam + 1}),
    {getNextPageParam: lastPage => lastPage.pageInfo.hasNext},
  );
  const notices = data?.pages.flatMap(page => page.content);

  const renderItem = useCallback(
    ({item}: {item: Notice}) => (
      <PostListItem title={item.title} createdAt={item.createdAt} content2={item.content} />
    ),
    [],
  );

  const keyExtractor = useCallback((item: Notice, index: number) => `${item.id}-${index}`, []);

  if (isLoading || !data) return <View style={style.screenWithAppBarContainer} />;

  return (
    <View style={[style.screenWithAppBarContainer, {padding: 0}]}>
      <FlatList
        data={notices}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.8}
        onEndReached={() => fetchNextPage({pageParam: data!.pageParams.length})}
      />
    </View>
  );
}
