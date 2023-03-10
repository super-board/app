import React from "react";

import {Path, Svg} from "react-native-svg";

import colors from "@/constants/colors";

type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

export default function LevelHeart({width = 10, height = 9, fill = colors.OTBBlueLight3}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
      <Path
        d="M22.4934 0C16.3908 0 14.9866 6.52215 14.9866 6.52215C14.9866 6.52215 13.5825 0 7.47986 0C-0.512936 0 -6.96658 14.5253 14.9866 27C36.9668 14.5253 30.5132 0 22.4934 0Z"
        fill={fill}
      />
    </Svg>
  );
}
