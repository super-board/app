import React from "react";

import {useNavigation} from "@react-navigation/native";
import {StyleSheet, Text, TouchableOpacity} from "react-native";

const Cacnel = () => {
  const navigation: any = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.popToTop()}>
      <Text style={styles.text}>취소</Text>
    </TouchableOpacity>
  );
};

export default Cacnel;

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
});
