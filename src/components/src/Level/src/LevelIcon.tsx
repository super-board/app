import React from "react";

import * as SVG from "@/assets/svgs";
import colors from "@/constants/colors";
import type {Level} from "@/store";

type Props = {
  level: Level;
  width?: number;
  height?: number;
  color?: string;
};

export default function LevelIcon({level, width, height, color = colors.OTBBlueLight3}: Props) {
  switch (level) {
    case "JOKER":
      return <SVG.Icon.LevelJoker width={width} height={height} fill={color} />;
    case "CLOVER":
      return <SVG.Icon.LevelClover width={width} height={height} fill={color} />;
    case "HEART":
      return <SVG.Icon.LevelHeart width={width} height={height} fill={color} />;
    case "DIAMOND":
      return <SVG.Icon.LevelDiamond width={width} height={height} fill={color} />;
    case "SPADE":
      return <SVG.Icon.LevelSpade width={width} height={height} fill={color} />;
    case "PLAYER":
      return <SVG.Icon.LevelPlayer width={width} height={height} fill={color} />;
    default:
      return null;
  }
}
