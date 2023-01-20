import React, {useState} from "react";

import {ParamListBase} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {View} from "react-native";

import {OTBButton, SizedBox} from "@/components";
import keys from "@/constants/keys";
import style from "@/constants/style";
import {AsyncStorageService} from "@/services/storage";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

function OnboardingWelcomeScreen({navigation}: Props) {
  const [active, setActive] = useState(false);

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  const completeOnboarding = () => {
    AsyncStorageService.saveData(keys.ONBOARDING_COMPLETED, true);
    navigation.replace("Home");
  };

  return (
    <View style={style.container}>
      <OTBButton type="basic-primary" text="로그인" onPress={navigateToLogin} />
      <SizedBox height={8} />
      <OTBButton type="basic-secondary" text="온보딩 완료 처리하기" onPress={completeOnboarding} />
    </View>
  );
}

export default OnboardingWelcomeScreen;
