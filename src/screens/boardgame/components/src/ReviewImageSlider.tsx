import React, {useCallback, useState} from "react";

import {Dimensions, StyleSheet, Text, View} from "react-native";
import Carousel from "react-native-reanimated-carousel";

import colors from "@/constants/colors";
import typography from "@/constants/typography";

import ReviewImageSliderItem from "./ReviewImageSliderItem";

type Props = {
  imageUrls: string[];
};

export default function ReviewImageSlider({imageUrls}: Props) {
  const {width: screenWidth} = Dimensions.get("window");
  const [index, setIndex] = useState(0);

  const renderItem = useCallback(
    ({item}: {item: string}) => <ReviewImageSliderItem imageUrl={item} />,
    [],
  );

  if (imageUrls.length === 1) return <ReviewImageSliderItem imageUrl={imageUrls[0]} />;

  return (
    <View style={styles.container}>
      <Carousel
        loop={false}
        pagingEnabled={true}
        snapEnabled={true}
        width={screenWidth - 80}
        height={screenWidth * 0.8}
        data={imageUrls}
        renderItem={renderItem}
        onSnapToItem={setIndex}
      />
      <View style={styles.indicatorContainer}>
        <Text style={typography.subhead03}>
          {index + 1}/{imageUrls.length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
  },
  indicatorContainer: {
    position: "absolute",
    bottom: 8,
    right: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: colors.white,
  },
});
