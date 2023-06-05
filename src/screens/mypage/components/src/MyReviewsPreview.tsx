import React from "react";

import {useNavigation} from "@react-navigation/native";
import {Dimensions, Image, Pressable, StyleSheet, View} from "react-native";

import {SVG} from "@/assets/svgs";
import {Modal} from "@/components";
import colors from "@/constants/colors";
import {useModal} from "@/hooks";
import {RootStackNavigationProp} from "@/navigation/navigation";
import {MyReview} from "@/types";

type Props = {
  reviews: MyReview[];
};

export default function MyReviewsPreview({reviews}: Props) {
  const {visible, openModal, closeModal} = useModal();
  const navigation = useNavigation<RootStackNavigationProp>();

  const onWriteReview = () => {
    navigation.navigate("BottomTabView", {screen: "WriteTab", params: {screen: "WriteScreen"}});
  };

  const onNavigateToDetails = (boardGameId: number) => {
    navigation.navigate("BoardGameDetailsScreen", {id: boardGameId});
  };

  if (!reviews.length)
    return (
      <>
        <Pressable style={styles.emptyContainer} onPress={openModal}>
          <SVG.Icon.PlusRound width={48} height={48} color={colors.OTBBlack400} />
        </Pressable>

        <Modal.Dialog
          visible={visible}
          onRequestClose={closeModal}
          IconComponent={<SVG.Icon.Edit width={48} height={48} />}
          title={"작성한 보드게임 리뷰가 없어요!\n리뷰를 등록하시겠습니까?"}
          confirmText="등록"
          onConfirm={onWriteReview}
        />
      </>
    );

  return (
    <View style={styles.previewContainer}>
      {reviews.map(review => (
        <Pressable
          key={review.id}
          style={styles.previewButton}
          onPress={() => onNavigateToDetails(review.boardGameId)}>
          <Image
            style={styles.previewThumbnail}
            source={require("@/assets/images/fallback/board-game-fallback.png")}
          />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    width: (Dimensions.get("screen").width - 60) / 3,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.OTBBlack800,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.OTBBlack400,
  },
  previewContainer: {flexDirection: "row", gap: 6},
  previewButton: {
    aspectRatio: 1,
    width: (Dimensions.get("screen").width - 60) / 3,
    borderRadius: 5,
    overflow: "hidden",
  },
  previewThumbnail: {width: "100%", height: "100%"},
});
