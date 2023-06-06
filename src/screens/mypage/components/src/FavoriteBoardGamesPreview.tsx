import React from "react";

import {useNavigation} from "@react-navigation/native";
import {Dimensions, Pressable, StyleSheet, View} from "react-native";
import FastImage from "react-native-fast-image";

import {SVG} from "@/assets/svgs";
import {Modal} from "@/components";
import colors from "@/constants/colors";
import {network} from "@/constants/network";
import {useModal} from "@/hooks";
import {RootStackNavigationProp} from "@/navigation/navigation";
import {FavoriteBoardGame} from "@/types";

type Props = {
  boardGames: FavoriteBoardGame[];
};

export default function FavoriteBoardGamesPreview({boardGames}: Props) {
  const {visible, openModal, closeModal} = useModal();
  const navigation = useNavigation<RootStackNavigationProp>();

  const onFindRecommendations = () => {
    navigation.navigate("BottomTabView", {
      screen: "RecommendationTab",
      params: {screen: "RecommendationScreen"},
    });
  };

  const onNavigateToDetails = (boardGameId: number) => {
    navigation.navigate("BoardGameDetailsScreen", {id: boardGameId});
  };

  if (!boardGames.length)
    return (
      <>
        <Pressable style={styles.emptyContainer} onPress={openModal}>
          <SVG.Icon.ImageAddFill width={48} height={48} />
        </Pressable>

        <Modal.Dialog
          visible={visible}
          onRequestClose={closeModal}
          IconComponent={<SVG.Icon.Edit width={48} height={48} />}
          title={"맘에 드는 보드게임을 못 찾으셨나요? 저희가 도와드릴게요!"}
          confirmText="찾기"
          onConfirm={onFindRecommendations}
        />
      </>
    );

  return (
    <View style={styles.previewContainer}>
      {boardGames.map(boardGame => (
        <Pressable
          key={boardGame.id}
          style={styles.previewButton}
          onPress={() => onNavigateToDetails(boardGame.id)}>
          <FastImage
            style={styles.previewThumbnail}
            source={{
              uri: `${network.IMAGE_BASE_URL}/${boardGame.image}`,
            }}
            resizeMode={FastImage.resizeMode.cover}
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
