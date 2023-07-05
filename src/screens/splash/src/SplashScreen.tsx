import React, {useEffect} from "react";

import {StyleSheet, View} from "react-native";
import FastImage from "react-native-fast-image";

import {SVG} from "@/assets/svgs";
import colors from "@/constants/colors";
import {useInitializeApp} from "@/hooks";

function SplashScreen() {
  const {initializeApp} = useInitializeApp();

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.icon}
        source={require("@/assets/images/icon/splash-icon.png")}
        resizeMode={FastImage.resizeMode.center}
      />
      <SVG.Logo.Text style={styles.title} width={127} height={15} fill={colors.white} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.OTBBlack,
  },
  icon: {
    width: 119,
    height: 97,
  },
  title: {
    position: "absolute",
    bottom: 40,
    margin: "auto",
  },
});

export default SplashScreen;
