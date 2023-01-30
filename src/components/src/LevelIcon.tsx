import React from "react";

import * as Svgs from "@/assets/svgs";
import type {Level} from "@/services/api";

type Props = {
  level: Level;
  width?: number;
  height?: number;
};

export default function LevelIcon({level, width, height}: Props) {
  switch (level) {
    case "CLOVER":
      return <Svgs.Icon.LevelClover width={width ?? 10} height={height ?? 10} />;
    case "HEART":
      return <Svgs.Icon.LevelHeart width={width ?? 10} height={height ?? 9} />;
    case "DIAMOND":
      return <Svgs.Icon.LevelDiamond width={width ?? 10} height={height ?? 10.5} />;
    case "SPADE":
      return <Svgs.Icon.LevelSpade width={width ?? 10} height={height ?? 10} />;
    default:
      return null;
  }
}
