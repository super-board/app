import React from "react";

import FastImage from "react-native-fast-image";

import {ProfileCharacter} from "@/types";

type Props = {
  type: ProfileCharacter;
  width?: number;
  height?: number;
};

export default function ProfileImage({type, width = 80, height = 80}: Props) {
  switch (type) {
    case "PROFILE_1":
      return (
        <FastImage
          source={require("@/assets/images/profile/profile1.png")}
          style={{width, height}}
        />
      );
    case "PROFILE_2":
      return (
        <FastImage
          source={require("@/assets/images/profile/profile2.png")}
          style={{width, height}}
        />
      );
    case "PROFILE_3":
      return (
        <FastImage
          source={require("@/assets/images/profile/profile3.png")}
          style={{width, height}}
        />
      );
    case "PROFILE_4":
      return (
        <FastImage
          source={require("@/assets/images/profile/profile4.png")}
          style={{width, height}}
        />
      );
    case "PROFILE_5":
      return (
        <FastImage
          source={require("@/assets/images/profile/profile5.png")}
          style={{width, height}}
        />
      );
    case "PROFILE_6":
      return (
        <FastImage
          source={require("@/assets/images/profile/profile6.png")}
          style={{width, height}}
        />
      );
    case "PROFILE_7":
      return (
        <FastImage
          source={require("@/assets/images/profile/profile7.png")}
          style={{width, height}}
        />
      );
    case "PROFILE_8":
      return (
        <FastImage
          source={require("@/assets/images/profile/profile8.png")}
          style={{width, height}}
        />
      );
    case "PROFILE_9":
      return (
        <FastImage
          source={require("@/assets/images/profile/profile9.png")}
          style={{width, height}}
        />
      );
  }
}
