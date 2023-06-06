import React from "react";

import {Path, Svg} from "react-native-svg";

import colors from "@/constants/colors";

type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

export default function LevelJoker({width = 10, height = 9, fill = colors.OTBBlueLight3}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
      <Path
        d="M15.0002 19.86H7.29018C6.93018 19.86 6.66016 20.3099 6.66016 20.8499V26.0101C6.66016 26.5501 6.93018 27 7.29018 27H14.9402L15.0002 19.86Z"
        fill={colors.OTBBlack200}
      />
      <Path
        d="M8.45983 -0.00015586C6.30506 -0.0327708 4.22367 0.781966 2.66381 2.26889C1.10394 3.75581 0.190371 5.79605 0.119833 7.94992C-0.450167 12.1199 0.929825 16.7998 3.29983 18.3598C3.29983 18.3598 2.48985 14.1898 5.75985 14.2198C8.12985 14.2198 8.27982 17.2198 7.97982 19.8598H14.9999V5.81967C14.8092 4.21798 14.0386 2.7417 12.8337 1.6694C11.6287 0.597101 10.0728 0.00320422 8.45983 -0.00015586Z"
        fill={fill}
      />
      <Path
        d="M15 19.86H22.65C22.98 19.86 23.28 20.3099 23.28 20.8499V26.0101C23.28 26.5501 22.98 27 22.65 27H15V19.86Z"
        fill={fill}
      />
      <Path
        d="M29.85 7.94992C29.7795 5.79605 28.8659 3.75581 27.306 2.26889C25.7462 0.781966 23.6648 -0.0327708 21.51 -0.00015586C19.8985 -0.00255912 18.3428 0.590198 17.1414 1.66427C15.94 2.73835 15.1774 4.21793 15 5.81967V19.8598H22.02C21.69 17.2198 22.02 14.2198 24.24 14.2198C27.51 14.2198 26.7 18.3598 26.7 18.3598C28.0373 17.0152 29.0239 15.3629 29.5732 13.5478C30.1224 11.7327 30.2175 9.81038 29.85 7.94992Z"
        fill={colors.OTBBlack200}
      />
    </Svg>
  );
}
