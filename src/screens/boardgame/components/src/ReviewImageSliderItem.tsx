import React, {memo} from "react";

import FastImage from "react-native-fast-image";

import {network} from "@/constants/network";

type Props = {
  imageUrl: string;
};

function ReviewImageSliderItem({imageUrl}: Props) {
  return (
    <FastImage
      style={{width: "100%", aspectRatio: 1}}
      source={{
        uri: `${network.IMAGE_BASE_URL}/${imageUrl}`,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
}

export default memo(ReviewImageSliderItem);
