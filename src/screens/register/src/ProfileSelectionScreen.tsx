import React, {useState} from "react";

import {View} from "react-native";

import * as SVG from "@/assets/svgs";
import {FlexEmptyFill, OTBButton, SizedBox} from "@/components";
import {height} from "@/constants/device";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";

import {ProfileImageButton, ScreenTitle} from "../components";

const selectedSize = height / 5.5;
const selectedCircleSize = height / 6;
const listSize = height / 7;
const listCircleSize = height / 8;

export default function ProfileSelectionScreen({navigation, route}: ScreenProps) {
  const [disabled, setDisabled] = useState(false);
  const [profile, setProfile] = useState({svg: 1, color: "#87FCBD"});
  const [visible, setVisible] = useState(false);

  const profileData = [
    {svg: 1, color: "#87FCBD"},
    {svg: 2, color: "#FFFCB4"},
    {svg: 3, color: "#B583F0"},
  ];

  return (
    <View style={style.screenWithAppBarContainer}>
      <ScreenTitle title="프로필 캐릭터 선택" />
      <SizedBox height={20} />
      <View style={{justifyContent: "center", alignItems: "center", marginBottom: 12}}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: selectedCircleSize,
            height: selectedCircleSize,
            borderRadius: selectedCircleSize / 2,
            backgroundColor: profile.color,
          }}>
          <SVG.Profile.Fur1 width={selectedSize} height={selectedSize} />
        </View>
      </View>

      <View style={{alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
        {profileData.map((item, idx) => (
          <ProfileImageButton
            item={item}
            listCircleSize={listCircleSize}
            listSize={listSize}
            key={idx.toString()}
            setProfile={setProfile}
          />
        ))}
      </View>

      <FlexEmptyFill />
      <OTBButton
        type="basic-primary"
        text="다음"
        onPress={() => navigation.navigate("RegisterNicknameSettingScreen")}
        disabled={disabled}
      />
      <SizedBox height={36} />
    </View>
  );
}
