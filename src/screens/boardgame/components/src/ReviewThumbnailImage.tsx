import React from "react";

import {StyleSheet} from "react-native";
import FastImage from "react-native-fast-image";

import {network} from "@/constants/network";

type Props = {
  imageUrl: string;
};

export default function ReviewThumbnailImage({imageUrl}: Props) {
  return (
    <FastImage
      style={styles.image}
      source={{
        uri: `${network.IMAGE_BASE_URL}/${imageUrl}`,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
}

const styles = StyleSheet.create({
  image: {width: 72, height: 72},
});
