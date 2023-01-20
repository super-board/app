import React from "react";

import {ParamListBase} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {ImageBackground, StyleSheet, Text, TouchableHighlight, View} from "react-native";

import {OTBButton, SizedBox} from "@/components";
import colors from "@/constants/colors";
import keys from "@/constants/keys";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {AsyncStorageService} from "@/services/storage";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

function OnboardingWelcomeScreen({navigation}: Props) {
  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  const navigateToOnboardingTagSelectScreen = () => {
    navigation.navigate("OnboardingTagSelectScreen");
  };

  const completeOnboarding = () => {
    AsyncStorageService.saveData(keys.ONBOARDING_COMPLETED, true);
    navigation.replace("Home");
  };

  return (
    <ImageBackground
      style={[style.container, styles.container]}
      imageStyle={styles.background}
      source={require("@/assets/images/background/onboarding-welcome.png")}>
      <View style={styles.slogan}>
        <Text style={[typography.display01, styles.textWhite, styles.textWithShadow]}>
          보드게임
        </Text>
        <Text style={[typography.display01, styles.textWhite, styles.textWithShadow]}>
          좋아하는 사람
        </Text>
        <Text style={[typography.display01, styles.textWhite, styles.textWithShadow]}>
          '온더보드'에서
        </Text>
        <Text style={[typography.display01, styles.textWhite, styles.textWithShadow]}>모여라!</Text>
      </View>

      <View style={styles.bottomActions}>
        <OTBButton type="basic-primary" text="로그인" onPress={navigateToLogin} />
        <SizedBox height={8} />
        <TouchableHighlight onPress={navigateToOnboardingTagSelectScreen}>
          <Text style={[typography.subhead02, styles.hyperlink, styles.textWhite]}>
            로그인 없이 둘러보기
          </Text>
        </TouchableHighlight>
        <SizedBox height={8} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    position: "relative",
  },
  background: {
    resizeMode: "cover",
    height: "90%",
    position: "absolute",
    top: "16%",
  },
  slogan: {
    marginTop: 4,
    display: "flex",
  },
  textWhite: {
    color: colors.white,
  },
  textWithShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 4,
  },
  bottomActions: {
    alignItems: "center",
  },
  hyperlink: {
    margin: 0,
    padding: 0,
  },
});

export default OnboardingWelcomeScreen;
