import { StyleSheet, Modal as DefModal, TouchableOpacity, View, Text } from 'react-native'
import React from 'react'
import * as SVG from "../../assets/svgs";

type ModalProps = DefModal["props"]&{
  title?: string,
  subTitle?: string,
  button?: any
}

const Warn = (props: ModalProps) => {
  const { title, subTitle, button, visible, onRequestClose,  children, ...otherProps } = props;
    
  return (
    <DefModal visible={visible} animationType="fade" transparent statusBarTranslucent
      onRequestClose={onRequestClose} {...otherProps}
    >
      <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
        <TouchableOpacity
          onPress={onRequestClose} activeOpacity={1}
          style={{position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)"}}
        />
        <View style={styles.container}>
          <SVG.Common.Warning width={40} height={40} style={{margin: 20}}/>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
          {button}
        </View>
      </View>
    </DefModal>
  );
}

export { Warn }

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1F2937",
    alignItems: "center",
    width: "70%",
    borderRadius: 8,
    padding: 16
  },
  title: {
    fontSize: 16,
    color: "white",
    fontWeight: "700",
    marginBottom: 8
  },
  subTitle: {
    fontSize: 14,
    color: "white",
    marginBottom: 20
  }
})