import React, {useCallback} from "react";

import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import FastImage from "react-native-fast-image";
import {Asset} from "react-native-image-picker";

import {SVG} from "@/assets/svgs";
import {SizedBox} from "@/components";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {useReviewFormStore} from "@/zustand-stores";

export default function ImageForm() {
  const {images, addImage, removeImage} = useReviewFormStore();

  const renderItem = useCallback(
    ({item, index}: {item: Asset; index: number}) => (
      <View key={item.id}>
        <FastImage style={styles.image} source={{uri: item.uri}} />
        <Pressable style={styles.close} onPress={() => removeImage(index)}>
          <SVG.Icon.CloseBlack width={12} height={12} />
        </Pressable>
      </View>
    ),
    [images],
  );

  const itemSeparator = useCallback(() => <SizedBox width={8} />, []);

  const keyExtractor = useCallback((item: Asset, index: number) => `${item.id}-${index}`, []);

  const listHeader = useCallback(() => {
    const disabled = images.length >= 5;

    return (
      <Pressable
        style={[styles.image, disabled ? styles.disabledBtn : styles.addBtn]}
        onPress={addImage}
        disabled={disabled}>
        <SVG.Icon.Camera
          width={24}
          height={24}
          color={disabled ? colors.OTBBlack600 : colors.OTBBlack}
        />
        <Text style={[typography.subhead02, disabled ? styles.disabledText : styles.addText]}>
          사진 추가
        </Text>
      </Pressable>
    );
  }, [images]);

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={itemSeparator}
      horizontal
      ListHeaderComponent={listHeader}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  close: {
    borderRadius: 10,
    height: 20,
    width: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 4,
    top: 4,
  },
  addBtn: {
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  disabledBtn: {
    backgroundColor: colors.OTBBlack800,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  addText: {
    marginTop: 4,
    color: colors.OTBBlack,
  },
  disabledText: {
    color: colors.OTBBlack600,
    marginTop: 4,
  },
});
