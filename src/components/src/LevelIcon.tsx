import React from "react";

import * as SVG from "@/assets/svgs";
import type {Level} from "@/store";

type Props = {
  level: Level;
  width?: number;
  height?: number;
};

export default function LevelIcon({level, width, height}: Props) {
  switch (level) {
    case "CLOVER":
      return <SVG.Icon.LevelClover width={width ?? 10} height={height ?? 10} />;
    case "HEART":
      return <SVG.Icon.LevelHeart width={width ?? 10} height={height ?? 9} />;
    case "DIAMOND":
      return <SVG.Icon.LevelDiamond width={width ?? 10} height={height ?? 10.5} />;
    case "SPADE":
      return <SVG.Icon.LevelSpade width={width ?? 10} height={height ?? 10} />;
    default:
      return null;
  }
}
