import React, {useCallback, useState} from "react";

import {useQuery} from "@tanstack/react-query";
import {FlatList, View} from "react-native";

import {api} from "@/api";
import style from "@/constants/style";
import {Notice} from "@/types";

import {PostListItem} from "../components";

export default function NoticeScreen() {
  const [page, setPage] = useState(1);
  // FIXME: 무한스크롤 변경
  const {isLoading, data: paginatedNotices} = useQuery(["notices", page], api.notice.fetchNotices);

  const onEndReached = () => {
    if (paginatedNotices?.pageInfo.hasNext) setPage(state => state + 1);
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
