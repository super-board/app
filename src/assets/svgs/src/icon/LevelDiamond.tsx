import React from "react";

import {Path, Svg} from "react-native-svg";

import colors from "@/constants/colors";

type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

export default function LevelDiamond({
  width = 10,
  height = 10.5,
  fill = colors.OTBBlueLight3,
}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
      <Path
        d="M15 0L14.5179 0.70875C10.5 6.405 5.59821 11.4975 0 15.75C5.59821 20.0025 10.5 25.095 14.5179 30.7912L15 31.5L15.4821 30.7912C19.5 25.0687 24.4018 20.0025 30 15.75C24.4018 11.4975 19.5 6.405 15.4821 0.70875L15 0Z"
        fill={fill}
      />
    </Svg>
  );
}
