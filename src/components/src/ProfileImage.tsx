import React from "react";

import * as SVG from "@/assets/svgs";
import {ProfileCharacter} from "@/store";

type Props = {
  type: ProfileCharacter;
  width?: number;
  height?: number;
};

export default function ProfileImage({type, width = 80, height = 80}: Props) {
  switch (type) {
    case "PROFILE_1":
      return <SVG.Profile.Profile1 width={width} height={height} />;
    case "PROFILE_2":
      return <SVG.Profile.Profile2 width={width} height={height} />;
    case "PROFILE_3":
      return <SVG.Profile.Profile3 width={width} height={height} />;
    case "PROFILE_4":
      return <SVG.Profile.Profile4 width={width} height={height} />;
    case "PROFILE_5":
      return <SVG.Profile.Profile5 width={width} height={height} />;
    case "PROFILE_6":
      return <SVG.Profile.Profile6 width={width} height={height} />;
    case "PROFILE_7":
      return <SVG.Profile.Profile7 width={width} height={height} />;
    case "PROFILE_8":
      return <SVG.Profile.Profile8 width={width} height={height} />;
    case "PROFILE_9":
      return <SVG.Profile.Profile9 width={width} height={height} />;
  }
}
