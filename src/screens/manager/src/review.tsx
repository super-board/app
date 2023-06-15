import React from "react";

import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";

import {api} from "@/api";
import {SVG} from "@/assets/svgs";
import {Modal} from "@/components";
import colors from "@/constants/colors";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {useModal} from "@/hooks";
import {RootStackParamList} from "@/navigation/navigation";
import {ReviewAdmin} from "@/types";

export default function ReviewTabScreen() {
  const {data, fetchNextPage, hasNextPage} = useInfiniteQuery(
    ["admin/reviews"],
    ({pageParam = 0}) => api.admin.fetchReviews({limit: 10, offset: 10 * pageParam + 1}),
    {getNextPageParam: lastPage => lastPage.pageInfo.hasNext},
  );
  const reviews = data?.pages.flatMap(page => page.content);
  const onEndReached = () => {
    if (hasNextPage) fetchNextPage({pageParam: data?.pageParams.length});
  };

  const renderItem = React.useCallback(
    ({item}: {item: ReviewAdmin}) => <ListItem review={item} />,
    [],
  );
  const listHeader = React.useCallback(() => <View style={{marginTop: 16}} />, []);
  const itemSeparator = React.useCallback(() => <View style={styles.divider} />, []);

  return (
    <View style={style.screenWithAppBarContainer}>
      <FlatList
        data={reviews}
        renderItem={renderItem}
        ListHeaderComponent={listHeader}
        ItemSeparatorComponent={itemSeparator}
        keyExtractor={item => item.id.toString()}
        onEndReachedThreshold={0.8}
        onEndReached={onEndReached}
      />
    </View>
  );
}

function ListItem({review}: {review: ReviewAdmin}) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const {visible, openModal, closeModal} = useModal();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const queryClient = useQueryClient();
  const {mutate: hideReview} = useMutation(["admin/reviews/hide"], api.admin.hideReview, {
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["boardgames/reviews"], refetchType: "all"});
      queryClient.invalidateQueries({queryKey: ["admin/reviews"], refetchType: "all"});
    },
  });
  const onPress = {
    toBoardGame: () => navigation.navigate("BoardGameDetailsScreen", {id: review.boardgameId}),
    hide: () => hideReview(review.id),
  };

  return (
    <>
      <Pressable style={styles.block} onPress={() => setIsExpanded(state => !state)}>
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <Text
              style={[typography.body02, styles.title, review.isHidden ? styles.lineThrough : null]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {review.boardgameName}
            </Text>
            {isExpanded ? (
              <SVG.Icon.ArrowUp width={12} height={8} />
            ) : (
              <SVG.Icon.ArrowDown width={12} height={8} />
            )}
          </View>

          <Text
            style={[typography.body02, styles.text, review.isHidden ? styles.lineThrough : null]}
            numberOfLines={isExpanded ? undefined : 1}>
            {review.content}
          </Text>

          {isExpanded ? (
            <View style={{flexDirection: "row", gap: 12, marginVertical: 8}}>
              <Pressable onPress={onPress.toBoardGame}>
                <Text style={[typography.caption, typography.textWhite, typography.underline]}>
                  보드게임으로 이동
                </Text>
              </Pressable>
              <Pressable onPress={openModal}>
                <Text style={[typography.caption, typography.textWhite, typography.underline]}>
                  숨김
                </Text>
              </Pressable>
            </View>
          ) : null}

          <View style={styles.info}>
            <Text style={[typography.caption, typography.textBlack500]}>{review.nickname}</Text>
            <Text style={[typography.caption, typography.textBlack500]}>
              {review.createdAt.slice(0, 10)}
            </Text>
            <Text style={[typography.caption, typography.textBlack500]}>
              {review.createdAt.slice(11)}
            </Text>
          </View>
        </View>

        <Modal.Dialog
          visible={visible}
          title="숨김처리 하시겠습니까?"
          confirmText="확인"
          onConfirm={onPress.hide}
          onRequestClose={closeModal}
        />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    flexDirection: "row",
  },
  title: {
    color: colors.OTBBlack400,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: {
    flexDirection: "row",
    gap: 8,
  },
  contentContainer: {
    flex: 1,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: colors.OTBBlack600,
    marginVertical: 16,
  },
  textInput: {
    height: 216,
    backgroundColor: colors.OTBBlack700,
    marginTop: 8,
    borderRadius: 4,
    padding: 12,
    textAlignVertical: "top",
    paddingTop: 8,
    fontSize: 16,
  },
  text: {
    color: colors.white,
  },
  lineThrough: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
});
