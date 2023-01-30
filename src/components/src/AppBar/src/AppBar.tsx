import React, {ReactNode} from "react";

import {Dimensions, StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import colors from "@/constants/colors";

type LayoutProps = {
  marginLeft?: number;
  marginRight?: number;
  gap?: number;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode | ReactNode[];
};

/* 전체 AppBar를 감싸는 컨테이너 컴포넌트 */
function Container({style, children}: LayoutProps) {
  const insets = useSafeAreaInsets();
  return <View style={[styles.container, style, {marginTop: insets.top ? insets.top : 0}]}>{children}</View>;
}

/* AppBar 상단 56px로 고정되는 레이아웃 컴포넌트 */
function Header({style, children}: LayoutProps) {
  return <View style={[styles.headerContainer, style]}>{children}</View>;
}

/* AppBar.Header 왼쪽 영역에 배치할 때 쓰는 레이아웃 컴포넌트 */
function Left({marginLeft = 0, style, children}: LayoutProps) {
  return <View style={[styles.leftContainer, {marginLeft}, style]}>{children}</View>;
}

/* AppBar.Header 오른쪽 영역에 배치할 때 쓰는 레이아웃 컴포넌트 */
function Right({marginRight = 0, style, children}: LayoutProps) {
  return <View style={[styles.rightContainer, {marginRight}, style]}>{children}</View>;
}

/* AppBar.Header 가운데 영역에 배치할 때 쓰는 레이아웃 컴포넌트 */
function Center({style, children}: LayoutProps) {
  return <View style={[styles.centerContainer, style]}>{children}</View>;
}

/* AppBar 상단 56px 아래쪽으로 추가되는 고정 영역 레이아웃 컴포넌트 */
function Content({style, children}: LayoutProps) {
  return <View style={[styles.contentContainer, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  headerContainer: {
    width: "100%",
    height: 56,
    position: "relative",
    backgroundColor: colors.OTBBlack,
  },
  leftContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  centerContainer: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: [
      {
        translateX: -Dimensions.get("window").width * 0.5,
      },
    ],
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    width: "100%",
    height: 64,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const AppBar = {
  Container,
  Header,
  Left,
  Right,
  Center,
  Content,
};
