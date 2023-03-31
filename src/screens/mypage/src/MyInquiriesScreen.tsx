import React, {useCallback, useState} from "react";

import {FlatList, View} from "react-native";

import style from "@/constants/style";
import {Inquiry, useGetMyInquiresQuery} from "@/store";

import {PostListItem} from "../components";

export default function MyInquiriesScreen() {
  const [page, setPage] = useState(1);
  const {isLoading, data: paginatedInquires} = useGetMyInquiresQuery({page});

  const onEndReached = () => {
    if (paginatedInquires?.hasNext) setPage(state => state + 1);
  };

  const renderItem = useCallback(
    ({item}: {item: Inquiry}) => (
      <PostListItem
        title={item.title}
        createdAt={item.createdAt}
        content1={item.question}
        content2={item.answer}
      />
    ),
    [],
  );

  const keyExtractor = useCallback((item: Inquiry, index: number) => `${item.id}-${index}`, []);

  if (isLoading || !paginatedInquires) return <View style={style.screenWithAppBarContainer} />;

  return (
    <View style={[style.screenWithAppBarContainer, {padding: 0}]}>
      <FlatList
        data={paginatedInquires.content}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.8}
        onEndReached={onEndReached}
      />
    </View>
  );
}
