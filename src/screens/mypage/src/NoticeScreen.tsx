import React, {useCallback, useState} from "react";

import {FlatList, View} from "react-native";

import style from "@/constants/style";
import {Notice, useGetNoticesQuery} from "@/store";

import {PostListItem} from "../components";

export default function NoticeScreen() {
  const [page, setPage] = useState(1);
  const {isLoading, data: paginatedNotices} = useGetNoticesQuery({page});

  const onEndReached = () => {
    if (paginatedNotices?.hasNext) setPage(state => state + 1);
  };

  const renderItem = useCallback(
    ({item}: {item: Notice}) => (
      <PostListItem title={item.title} createdAt={item.createdAt} content2={item.content} />
    ),
    [],
  );

  const keyExtractor = useCallback((item: Notice, index: number) => `${item.id}-${index}`, []);

  if (isLoading || !paginatedNotices) return <View style={style.screenWithAppBarContainer} />;

  return (
    <View style={[style.screenWithAppBarContainer, {padding: 0}]}>
      <FlatList
        data={paginatedNotices.content}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.8}
        onEndReached={onEndReached}
      />
    </View>
  );
}
