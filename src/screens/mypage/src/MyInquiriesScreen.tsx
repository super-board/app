import React, {useCallback} from "react";

import {useInfiniteQuery} from "@tanstack/react-query";
import {FlatList, View} from "react-native";

import {api} from "@/api";
import style from "@/constants/style";
import {Inquiry} from "@/types";

import {PostListItem} from "../components";

export default function MyInquiriesScreen() {
  const {isLoading, data, fetchNextPage, hasNextPage} = useInfiniteQuery(
    ["inquiries"],
    ({pageParam = 0}) => api.inquiry.fetchInquiries({limit: 10, offset: 10 * pageParam + 1}),
    {getNextPageParam: lastPage => lastPage.pageInfo.hasNext},
  );
  const inquiries = data?.pages.flatMap(page => page.content);
  const onEndReached = () => {
    if (hasNextPage) fetchNextPage({pageParam: data?.pageParams.length});
  };

  const renderItem = useCallback(
    ({item}: {item: Inquiry}) => (
      <PostListItem
        title={item.title}
        createdAt={item.createdAt}
        content1={item.content}
        content2={item.answer}
      />
    ),
    [],
  );

  const keyExtractor = useCallback((item: Inquiry, index: number) => `${item.id}-${index}`, []);

  if (isLoading || !data) return <View style={style.screenWithAppBarContainer} />;

  return (
    <View style={[style.screenWithAppBarContainer, {padding: 0}]}>
      <FlatList
        data={inquiries}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.8}
        onEndReached={onEndReached}
      />
    </View>
  );
}
