import React from "react";

import {Path, Svg} from "react-native-svg";

import colors from "@/constants/colors";

type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

export default function LevelSpade({width = 10, height = 10, fill = colors.OTBBlueLight3}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
      <Path
        d="M25.534 9.07933C19.1579 3.32027 15.0149 0 15.0149 0C15.0149 0 10.8426 3.32027 4.46647 9.07933C-3.23187 16.0431 0.382234 22.7424 5.23042 24.2409C9.87293 25.6807 12.7818 23.1538 14.1335 21.4789C13.7809 24.0353 13.2226 27.238 12.7818 27.9432C12.5762 28.2958 12.4292 28.7071 12.4292 29.1185V29.9706H17.5713V29.1185C17.5713 28.7071 17.4537 28.2958 17.2187 27.9432C16.8073 27.238 16.2196 24.0353 15.8671 21.4789C17.2187 23.1538 20.1276 25.7101 24.7701 24.2409C29.6183 22.713 33.2324 16.0431 25.534 9.07933Z"
        fill={fill}
      />
    </Svg>
  );
}
