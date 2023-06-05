import React, {useCallback, useMemo, useState} from "react";

import {useFocusEffect} from "@react-navigation/native";
import {StyleSheet, TouchableOpacity, View} from "react-native";

import {SVG} from "@/assets/svgs";
import {OTBButton, ProfileImage, ScreenTitle, SizedBox} from "@/components";
import colors from "@/constants/colors";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import type {ProfileCharacter} from "@/types";

export default function ProfileSelectionScreen({navigation, route}: ScreenProps) {
  const [profile, setProfile] = useState<ProfileCharacter>("PROFILE_1");
  const profileCharacters = useMemo(
    () =>
      [
        "PROFILE_1",
        "PROFILE_2",
        "PROFILE_3",
        "PROFILE_4",
        "PROFILE_5",
        "PROFILE_6",
        "PROFILE_7",
        "PROFILE_8",
        "PROFILE_9",
      ] as ProfileCharacter[],
    [],
  );

  const onSelectProfile = useCallback(
    (profile: ProfileCharacter) => {
      setProfile(profile);
    },
    [profile],
  );

  useFocusEffect(
    useCallback(() => {
      setProfile("PROFILE_1");
    }, []),
  );

  return (
    <View style={style.screenWithAppBarContainer}>
      <ScreenTitle title="프로필 캐릭터 선택" />

      <SizedBox height={20} />
      <View style={{justifyContent: "center", alignItems: "center"}}>
        <ProfileImage type={profile} width={148} height={148} />
      </View>
      <SizedBox height={20} />

      <View style={{width: "100%", flex: 1, justifyContent: "center"}}>
        <View style={styles.buttonContainer}>
          {profileCharacters.map(profileCharacter => (
            <TouchableOpacity
              key={profileCharacter}
              style={[
                styles.button,
                {borderColor: profile === profileCharacter ? "white" : "transparent"},
              ]}
              activeOpacity={1}
              onPress={() => onSelectProfile(profileCharacter)}>
              <ProfileImage type={profileCharacter} />
              {profile === profileCharacter ? (
                <>
                  <View style={styles.selectedOverlay} />
                  <SVG.Icon.ProfileCheck style={styles.selectedCheck} width={56} height={56} />
                </>
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <SizedBox height={22} />
      <OTBButton
        type="basic-primary"
        text="다음"
        onPress={() =>
          navigation.navigate("RegisterNicknameSettingScreen", {
            ...route.params,
            profileCharacter: profile,
          })
        }
      />
      <SizedBox height={36} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
  },
  button: {
    position: "relative",
    borderWidth: 3,
    borderRadius: 9999,
  },
  selectedOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 80,
    height: 80,
    borderRadius: 9999,
    backgroundColor: colors.OTBBlue,
    opacity: 0.5,
  },
  selectedCheck: {
    position: "absolute",
    top: 12,
    left: 12,
  },
});
