import React from "react";

import {StyleSheet, View} from "react-native";

import {OTBButton} from "@/components";
import keys from "@/constants/keys";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import {AsyncStorageService} from "@/services/storage";

export default function ({navigation}: ScreenProps) {
  const resetOnboarding = async () => {
    // 기존 데이터 확인
    const data = await AsyncStorageService.getAllData();
    console.log(data);

    // 초기화
    AsyncStorageService.removeData(keys.ONBOARDING_COMPLETED);
    AsyncStorageService.removeData(keys.INTEREST_TAG_IDS);
    navigation.reset({index: 0, routes: [{name: "OnboardingWelcomeScreen"}]});
  };

  return (
    <View style={style.screenWithAppBarContainer}>
      <OTBButton type="basic-primary" text="온보딩 초기화" onPress={resetOnboarding} />
    </View>
  );
}

const styles = StyleSheet.create({});
