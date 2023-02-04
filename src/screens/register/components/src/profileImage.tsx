import React, {Dispatch, SetStateAction} from "react";

import {TouchableOpacity} from "react-native";

import * as SVG from "@/assets/svgs";

type ProfileImageProps = {
  item: any;
  listCircleSize: number;
  listSize: number;
  setProfile: Dispatch<SetStateAction<boolean>>;
};

export default function ProfileImage(props: ProfileImageProps) {
  const {item, listCircleSize, listSize, setProfile} = props;

  const onPress = () => {
    setProfile(item);
  };

  return (
    <TouchableOpacity
      style={{
        width: listCircleSize,
        height: listCircleSize,
        borderRadius: listCircleSize / 2,
        backgroundColor: item.color,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
      }}
      onPress={() => onPress()}>
      <SVG.Profile.Fur1 width={listSize} height={listSize} />
    </TouchableOpacity>
  );
}
