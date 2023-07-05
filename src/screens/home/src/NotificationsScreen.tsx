import React from "react";

import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {FlatList, StyleSheet, View} from "react-native";

import {api} from "@/api";
import colors from "@/constants/colors";
import {RootStackParamList} from "@/navigation/navigation";
import {NotificationListItem} from "@/screens/mypage/components";
import {Notification} from "@/types";

export default function NotificationsScreen() {
  const {isLoading, data, hasNextPage, fetchNextPage} = useInfiniteQuery(
    ["notifications"],
    ({pageParam = 0}) =>
      api.notification.fetchNotifications({limit: 10, offset: 10 * pageParam + 1}),
    {getNextPageParam: lastPage => lastPage.pageInfo.hasNext},
  );
  const notifications = data?.pages.flatMap(page => page.content);
  const onEndReached = () => {
    if (hasNextPage) fetchNextPage({pageParam: data?.pageParams.length});
  };
  const {mutate: checkNotification} = useMutation(api.notification.checkNotification);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const queryClient = useQueryClient();

  const renderItem = React.useCallback(({item}: {item: Notification}) => {
    // FIXME: API 수정되면 message 변경
    const message = "내가 작성한 리뷰에 댓글이 달렸어요!";
    const onPress = () => {
      checkNotification(item.id);
      navigation.navigate("BoardGameDetailsScreen", {
        id: item.payload.boardgameId!,
      });
    };
    return (
      <NotificationListItem
        isChecked={item.isChecked}
        message={message}
        pushedAt={item.pushedAt}
        onPress={onPress}
      />
    );
  }, []);

  const keyExtractor = React.useCallback(
    (item: Notification, index: number) => `${item.id}-${index}`,
    [],
  );

  const itemSeparator = React.useCallback(() => <View style={styles.horizontalDivider} />, []);

  useFocusEffect(
    React.useCallback(() => {
      queryClient.invalidateQueries({queryKey: ["notifications"], refetchType: "all"});
    }, [queryClient]),
  );

  if (isLoading || !notifications) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <FlatList
        style={{flex: 1}}
        data={notifications}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={itemSeparator}
        onEndReachedThreshold={0.8}
        onEndReached={onEndReached}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 24, backgroundColor: colors.OTBBlack},

  horizontalDivider: {
    marginVertical: 16,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: colors.OTBBlack700,
  },
});
