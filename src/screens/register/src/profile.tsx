import React, {useState} from "react";

import {StyleSheet, TouchableOpacity, View} from "react-native";

import * as SVG from "@/assets/svgs";
import {Button, Modal, Title} from "@/components";
import {height} from "@/constants/device";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";

const selectedSize = height / 5.5;
const selectedCircleSize = height / 6;
const listSize = height / 7;
const listCircleSize = height / 8;

const Profile = ({navigation, route}: ScreenProps) => {
  const [disabled, setDisabled] = useState(false);
  const [profile, setProfile] = useState({});
  const [visible, setVisible] = useState(false);

  const profileData = [
    {svg: 1, color: "#87FCBD"},
    {svg: 2, color: "#FFFCB4"},
    {svg: 3, color: "#B583F0"},
  ];

  const RenderProfileImage = (item: any) => {
    const {svg, color} = item.item;
    return (
      <TouchableOpacity
        style={{
          width: listCircleSize,
          height: listCircleSize,
          borderRadius: listCircleSize / 2,
          backgroundColor: color,
          justifyContent: "center",
          alignItems: "center",
          margin: 8,
        }}>
        <SVG.Profile.Fur1 width={listSize} height={listSize} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={style.container}>
      <Title title="프로필 캐릭터 선택" />
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
      {/* 
      <View style={{alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
        {profileData.map((item, idx) => (
          <RenderProfileImage item={item} key={idx} />
        ))}
      </View>

        */}

      <Button text="뱃지 모달" onPress={() => setVisible(true)} />
      <Modal.Badge visible={visible} onRequestClose={() => setVisible(false)} type="welcome" />

      <Button
        text="다음"
        onPress={() => navigation.navigate("RegisterNickname", {...route.params, profile})}
        disabled={disabled}
        style={style.nextBtn}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
