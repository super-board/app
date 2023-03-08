import React, {useEffect} from "react";

import {StyleSheet, View} from "react-native";

import {OTBButton} from "@/components";
import keys from "@/constants/keys";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import {AsyncStorageService} from "@/services/storage";
import {useCheckPasswordShouldBeChangedMutation} from "@/store";

export default function MainScreen({navigation}: ScreenProps) {
  const [checkPasswordShouldBeChanged, {data, error}] = useCheckPasswordShouldBeChangedMutation();

  const resetOnboarding = async () => {
    // 기존 데이터 확인
    const data = await AsyncStorageService.getAllData();
    console.log(data);

    // 초기화
    AsyncStorageService.removeData(keys.ONBOARDING_COMPLETED);
    AsyncStorageService.removeData(keys.INTEREST_TAG_IDS);
    AsyncStorageService.removeData(keys.PERMISSION_GRANT_REQUESTED);
    navigation.reset({index: 0, routes: [{name: "OnboardingWelcomeScreen"}]});
  };

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  return (
    <View style={style.screenWithAppBarContainer}>
      <OTBButton type="basic-primary" text="온보딩 초기화" onPress={resetOnboarding} />
      <OTBButton
        type="basic-primary"
        text="비밀번호 변경 확인"
        onPress={checkPasswordShouldBeChanged}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
