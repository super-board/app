import React, {Dispatch, SetStateAction, useEffect, useState} from "react";

import {Modal as DefModal, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import badge from "@/constants/badges";

import * as SVG from "../../assets/svgs";
import Button from "./button";

type ModalProps = DefModal["props"] & {
  title?: string;
  subTitle?: string;
  button?: any;
  setVisible?: Dispatch<SetStateAction<boolean>> | any;
  type?: string;
};

const Warn = (props: ModalProps) => {
  const {title, subTitle, button, visible, setVisible, onRequestClose, ...otherProps} = props;

  return (
    <DefModal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={onRequestClose}
      {...otherProps}>
      <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
        <TouchableOpacity
          onPress={onRequestClose}
          activeOpacity={1}
          style={styles.onRequestClose}
        />
        <View style={styles.container}>
          <SVG.Common.Warning width={40} height={40} style={{margin: 20}} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
          <Button text="확인" onPress={() => setVisible(false)} style={{marginBottom: 4}} />
        </View>
      </View>
    </DefModal>
  );
};

type BadgeProps = {
  svg?: any;
  title?: string;
  subTitle?: string;
};

const Badge = (props: ModalProps) => {
  const {title, subTitle, button, visible, setVisible, type, ...otherProps} = props;
  const [item, setItem] = useState<BadgeProps>({});

  useEffect(() => {
    switch (type) {
      case "welcome":
        setItem(badge.welcome);
        break;
      case "review1":
        setItem(badge.review1);
        break;
      case "review5":
        setItem(badge.review5);
        break;
      case "attendance7":
        setItem(badge.attendance7);
        break;
      case "attendance30":
        setItem(badge.attendance30);
        break;
    }
  }, [type]);

  return (
    <DefModal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      {...otherProps}>
      <View style={styles.modalContainer}>
        <TouchableOpacity activeOpacity={1} style={styles.onRequestClose} />
        <View style={styles.badgeContainer}>
          <View style={styles.close}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <SVG.Icon.Close width={30} height={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.badge}>
            <SVG.Badge.Welcome width={"103%"} height={"100%"} style={styles.badgeSVG} />
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subTitle}>{item.subTitle}</Text>
        </View>

        <Button
          text="내 뱃지 보러가기"
          onPress={() => setVisible(false)}
          style={{marginTop: 8, width: "70%"}}
        />
      </View>
    </DefModal>
  );
};

export {Warn, Badge};

const styles = StyleSheet.create({
  onRequestClose: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  container: {
    backgroundColor: "#1F2937",
    alignItems: "center",
    width: "70%",
    borderRadius: 8,
    padding: 16,
  },
  title: {
    fontSize: 16,
    color: "white",
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 14,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  badgeContainer: {
    backgroundColor: "#1F2937",
    alignItems: "center",
    width: "70%",
    borderRadius: 8,
    height: "50%",
  },
  close: {
    width: "100%",
    alignItems: "flex-end",
    marginRight: 8,
    marginTop: 8,
  },
  badge: {
    flex: 1,
    width: "100%",
  },
  badgeSVG: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 10,
  },
});
