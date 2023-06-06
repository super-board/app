import React from "react";

import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FastImage from "react-native-fast-image";

import {SVG} from "@/assets/svgs";
import colors from "@/constants/colors";
import typography from "@/constants/typography";

type ImageProps = {
  imageArray: any;
  addImage: () => void;
  setImage: React.Dispatch<React.SetStateAction<any[]>> | any;
};

export default function Image(props: ImageProps) {
  const {imageArray, addImage, setImage} = props;

  const onPress = {
    delete: (item: {image: string; index: string}) => {
      let newArray = [];
      for (let i in imageArray) {
        if (item.index !== i) newArray.push(imageArray[i]);
      }
      setImage(newArray);
    },
  };

  function ImageList(image: {image: string; index: string}) {
    return (
      <View key={image.image}>
        <FastImage style={styles.image} source={{uri: image.image}} />
        <TouchableOpacity style={styles.close} onPress={() => onPress.delete(image)}>
          <SVG.Icon.CloseBlack width={12} height={12} />
        </TouchableOpacity>
      </View>
    );
  }

  function AddImage() {
    if (imageArray.length === 5) {
      return null;
    } else {
      return (
        <TouchableOpacity style={[styles.image, styles.addBtn]} onPress={addImage}>
          <SVG.Icon.Camera width={20} height={16} />
          <Text style={[typography.subhead02, styles.addText]}>사진 추가</Text>
        </TouchableOpacity>
      );
    }
  }

  return (
    <FlatList
      data={imageArray}
      renderItem={({item, index}) => <ImageList image={item} index={index.toString()} />}
      keyExtractor={item => item}
      ItemSeparatorComponent={() => <View style={{marginRight: 8}} />}
      horizontal
      ListHeaderComponent={() => <AddImage />}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  close: {
    borderRadius: 10,
    height: 20,
    width: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 4,
    top: 4,
  },
  addBtn: {
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  addText: {
    marginTop: 4,
  },
});
