import React from "react";

import {useNavigation} from "@react-navigation/native";
import {StyleSheet, TouchableOpacity} from "react-native";

import {SVG} from "@/assets/svgs";
import colors from "@/constants/colors";

export default function writeButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("WriteScreen")}>
      <SVG.Icon.Edit width={22} height={22} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
    backgroundColor: colors.OTBBlue,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 24,
    bottom: 24,
  },
});
