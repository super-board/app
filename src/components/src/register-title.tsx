import React from "react";

import {StyleSheet, Text, View} from "react-native";

type RegTitleProps = {
  title: string;
  subTitle?: string;
  textAlign?: "center" | "auto" | "justify" | "right" | "left";
};

const Title = (props: RegTitleProps) => {
  const {title, subTitle, textAlign = "auto"} = props;

  return (
    <View style={[styles.textContainer]}>
      <Text style={[styles.title, {textAlign: textAlign}]}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: 40,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  subTitle: {
    color: "white",
    fontSize: 16,
    marginTop: 8,
    lineHeight: 24,
  },
});
