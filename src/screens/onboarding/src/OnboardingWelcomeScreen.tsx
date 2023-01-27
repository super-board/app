import React from "react";

import {ParamListBase} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {OTBButton, SizedBox} from "@/components";
import colors from "@/constants/colors";
import effects from "@/constants/effects";
import style from "@/constants/style";
import typography from "@/constants/typography";

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
  const insets = useSafeAreaInsets();
  
  return (
      <ImageBackground
        style={[style.container, styles.container]}
        imageStyle={styles.background}
        source={require("@/assets/images/background/onboarding-welcome.png")}>
        <View style={[styles.slogan, {marginTop: insets.top ? insets.top : 0}]}>
          <Text style={[typography.display01, styles.textWhite, effects.textDropShadow]}>
            {`보드게임\n좋아하는 사람\n'온더보드'에서\n모여라!`}
          </Text>
        </View>

        <View style={styles.bottomActions}>
          <OTBButton type="basic-primary" text="로그인" onPress={navigateToLogin} />
          <SizedBox height={8} />
          <TouchableOpacity activeOpacity={1} onPress={navigateToOnboardingTagSelectScreen}>
            <Text style={[typography.subhead02, styles.hyperlink, styles.textWhite]}>
              로그인 없이 둘러보기
            </Text>
          </TouchableOpacity>
          <SizedBox height={8} />
        </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    position: "relative",
  },
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
  bottomActions: {
    alignItems: "center",
  },
  hyperlink: {
    margin: 0,
    padding: 0,
  },
});

export default OnboardingWelcomeScreen;
