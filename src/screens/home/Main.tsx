import React from "react";

import {ParamListBase} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {View} from "react-native";

import {OTBButton} from "@/components";
import keys from "@/constants/keys";
import style from "@/constants/style";
import {AsyncStorageService} from "@/services/storage";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const HomeScreen = ({navigation}: Props) => {
  const resetOnboarding = () => {
    AsyncStorageService.removeData(keys.ONBOARDING_COMPLETED);
    navigation.replace("OnboardingWelcomeScreen");
  };

  return (
    <View style={style.container}>
      <OTBButton type="basic-primary" text="온보딩 초기화" onPress={resetOnboarding} />
    </View>
  );
};

export default HomeScreen;
