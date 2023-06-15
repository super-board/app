import React, {useCallback} from "react";

import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import FastImage from "react-native-fast-image";

import {api} from "@/api";
import {SVG} from "@/assets/svgs";
import {Modal, OTBButton, RatingIcons, SizedBox, TagsHorizontalView} from "@/components";
import colors from "@/constants/colors";
import effects from "@/constants/effects";
import {network} from "@/constants/network";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {useModal, useRefetchQuery} from "@/hooks";
import {NumberFormatter} from "@/services/formatter";
import {useAuthStore, useReviewFormStore} from "@/zustand-stores";

import {ReviewList} from "../components";

export default function DetailsScreen({navigation, route}: ScreenProps) {
  const {id} = route.params as {id: number};
  const {
    visible: isSignUpModalVisible,
    openModal: openSignUpModal,
    closeModal: closeSignUpModal,
  } = useModal();
  const didLogin = useAuthStore(state => !!state.refreshToken);

  const queryClient = useQueryClient();
  const fetchDetailsFunc = didLogin
    ? api.boardGame.fetchBoardGameDetailsAuthenticated
    : api.boardGame.fetchBoardGameDetailsPublic;
  const {
    isLoading: isBoardGameDetailsLoading,
    isSuccess,
    data: boardGame,
  } = useRefetchQuery(["boardgames/details", id], () => fetchDetailsFunc(id));
  const filteredTags =
    boardGame?.tagList.filter(tag => !["BEST_PLAYER", "PLAYTIME", "AGE"].includes(tag.type)) ?? [];
  const fetchReviewsFunc = didLogin
    ? api.review.fetchReviewsAuthenticated
    : api.review.fetchReviewsPublic;
  const {data, hasNextPage, fetchNextPage} = useInfiniteQuery(
    ["boardgames/reviews", boardGame?.id],
    ({pageParam = 0}) =>
      fetchReviewsFunc({boardGameId: boardGame!.id, limit: 3, offset: 3 * pageParam + 1}),
    {enabled: isSuccess, getNextPageParam: lastPage => lastPage.pageInfo.hasNext},
  );
  const reviews = data?.pages.flatMap(page => page.content);
  const {mutate: toggleLike} = useMutation(["boardgames/likes"], api.like.toggleBoardGameLike, {
    onSuccess: () => queryClient.invalidateQueries(["boardgames/reviews", id]),
  });

  const onMoreReviews = () => {
    if (!didLogin) {
      openSignUpModal();
      return;
    }

    fetchNextPage({pageParam: data?.pageParams.length});
  };

  const onToggleLike = () => {
    if (didLogin) toggleLike({boardGameId: id});
  };

  const {selectBoardGame} = useReviewFormStore();

  const findTag = useCallback(
    (type: string) => {
      const DEFAULT_TAG = {name: "-"};
      if (!boardGame) return DEFAULT_TAG;

      return boardGame.tagList.find(tag => tag.type === type) ?? DEFAULT_TAG;
    },
    [boardGame],
  );

  const onWriteReview = () => {
    selectBoardGame(boardGame!);
    navigation.navigate("WriteScreen");
  };

  const onSignUp = () => {
    navigation.navigate("OnboardingLoginScreen");
  };

  if (isBoardGameDetailsLoading || !boardGame || !data) return null;

  return (
    <ScrollView style={[style.screenWithAppBarContainer, {padding: 0}]}>
      <View style={{paddingHorizontal: 24}}>
        <View style={styles.basicInfoContainer}>
          <View style={styles.thumbnailContainer}>
            <FastImage
              style={styles.thumbnail}
              source={{
                uri: `${network.IMAGE_BASE_URL}/${boardGame.image}`,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.likesContainer}>
              <Pressable onPress={onToggleLike}>
                {boardGame.isLiked ? (
                  <SVG.Icon.FavoriteFill width={32} height={32} />
                ) : (
                  <SVG.Icon.Favorite width={32} height={32} />
                )}
              </Pressable>
              <Text style={[typography.subhead03, typography.textWhite, effects.textDropShadow]}>
                {NumberFormatter.toCompactNumber(boardGame.favoriteCount)}
              </Text>
            </View>
          </View>
          <SizedBox height={16} />
          <Text style={[typography.headline, typography.textWhite]}>{boardGame.name}</Text>
          <SizedBox height={4} />
          <View style={styles.ratingContainer}>
            <RatingIcons rating={boardGame.grade} size={16} />
            <Text style={[typography.body02, typography.textWhite]}>
              {boardGame.grade?.toFixed(2)}
            </Text>
          </View>
        </View>

        <SizedBox height={24} />
        <View style={styles.tagsRow}>
          <View style={styles.tags}>
            <SVG.Icon.Players width={24} height={24} />
            <Text style={[typography.subhead02, typography.textWhite]}>
              {findTag("BEST_PLAYER").name}
            </Text>
          </View>
          <View style={styles.tags}>
            <SVG.Icon.PlayTime width={24} height={24} />
            <Text style={[typography.subhead02, typography.textWhite]}>
              {findTag("PLAYTIME").name}
            </Text>
          </View>
          <View style={styles.tags}>
            <SVG.Icon.Age width={24} height={24} />
            <Text style={[typography.subhead02, typography.textWhite]}>{findTag("AGE").name}</Text>
          </View>
        </View>
        <SizedBox height={8} />
        <TagsHorizontalView tags={filteredTags} chipType="myPage" insetPadding={0} />
        <SizedBox height={40} />

        <Text style={[typography.bodyLong02, typography.textWhite]}>{boardGame.description}</Text>

        <OTBButton
          style={{marginVertical: 16}}
          type="basic-primary"
          text="내 리뷰 작성하기"
          onPress={onWriteReview}
        />
      </View>
      {reviews ? <ReviewList reviews={reviews} boardGame={boardGame} /> : null}

      {hasNextPage ? (
        <OTBButton
          style={{width: 152, alignSelf: "center", marginTop: 8}}
          type="short-secondary"
          text="리뷰 더보기"
          onPress={onMoreReviews}
        />
      ) : null}

      <SizedBox height={100} />

      <Modal.Dialog
        visible={isSignUpModalVisible}
        IconComponent={<SVG.Icon.SignUp width={80} height={80} />}
        title={"더 많은 보드게임 정보가\n궁금하신가요?"}
        description={"회원가입하고 재미있는\n보드게임 정보를 확인하세요!"}
        confirmText="회원가입"
        onConfirm={onSignUp}
        onRequestClose={closeSignUpModal}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  basicInfoContainer: {
    alignItems: "center",
  },
  thumbnailContainer: {position: "relative"},
  thumbnail: {width: 222, height: 222, borderRadius: 4},
  likesContainer: {position: "absolute", top: 8, right: 8, alignItems: "center"},
  ratingContainer: {flexDirection: "row", gap: 8, alignItems: "center"},
  tagsContainer: {gap: 8},
  tagsRow: {flexDirection: "row", gap: 8},
  tags: {
    flex: 1,
    height: 48,
    borderRadius: 4,
    backgroundColor: colors.OTBBlack800,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});
