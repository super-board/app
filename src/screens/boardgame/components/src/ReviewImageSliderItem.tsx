import React, {memo} from "react";

import {Image} from "react-native";

type Props = {
  imageUrl: string;
};

function ReviewImageSliderItem({imageUrl}: Props) {
  return <Image source={require("@/assets/images/fallback/board-game-fallback.png")} />;
}

export default memo(ReviewImageSliderItem);
