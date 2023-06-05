import React, {useEffect} from "react";

import {Image, StyleSheet, View} from "react-native";

import {SVG} from "@/assets/svgs";
import {SizedBox} from "@/components";
import colors from "@/constants/colors";
import {useInitializeApp} from "@/hooks";

function SplashScreen() {
  const {initializeApp} = useInitializeApp();

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={require("@/assets/images/icon/splash-icon.png")} />
      <SizedBox width={8} />
      <SVG.Logo.Text width={180} height={22.5} fill={colors.white} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.OTBBlack,
  },
  icon: {
    width: 48,
    height: 50.25,
  },
});

export default SplashScreen;
