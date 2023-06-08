import React, {useState} from "react";

import {Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {TextInput} from "react-native-gesture-handler";
import {launchImageLibrary} from "react-native-image-picker";
import StarRating from "react-native-star-rating-widget";

import {SVG} from "@/assets/svgs";
import {Modal, OTBButton} from "@/components";
import colors from "@/constants/colors";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {useModal} from "@/hooks";
import {PermissionCameraAndGalleryService} from "@/services/permission";

import {Image} from "../components";

export default function WriteScreen({navigation}: ScreenProps) {
  const [rate, setRate] = useState(0);
  const [image, setImage] = useState([]);
  const [text, setText] = useState("");
  const {
    visible: submitVisible,
    openModal: openSubmitModal,
    closeModal: closeSubmitModal,
  } = useModal();
  const {
    visible: cancelVisible,
    openModal: openCancelModal,
    closeModal: closeCancelModal,
  } = useModal();

  const onPress = {
    search: () => {
      navigation.navigate("SearchScreen");
    },
    image: async () => {
      await PermissionCameraAndGalleryService.requestPermission();
      launchImageLibrary(
        {
          quality: 0.5,
          mediaType: "photo",
          includeBase64: true,
        },
        response => {
          if (!response.didCancel) setImage(image => [...image, response.assets[0].uri]);
        },
      );
    },
    cancel: () => {
      openCancelModal();
    },
    submit: () => {
      openSubmitModal();
    },
  };

  return (
    <ScrollView style={style.screenWithAppBarContainer}>
      <Text style={[typography.subhead01, typography.textWhite, styles.title]}>보드게임</Text>
      <Pressable style={styles.search} onPress={onPress.search}>
        <Text style={{color: colors.OTBBlack500}}>보드게임을 선택해주세요</Text>
      </Pressable>
      <Text style={[typography.subhead01, typography.textWhite, styles.title, {marginTop: 32}]}>
        게임 평점
      </Text>

      <View style={styles.rate}>
        <StarRating
          rating={rate}
          onChange={setRate}
          color={colors.OTBBlueLight3}
          starStyle={{marginHorizontal: 0}}
        />
        <Text style={[typography.bodyLong01, typography.textWhite, styles.rateText]}>{rate}</Text>
      </View>
      <View style={styles.review}>
        <Text style={[typography.subhead01, typography.textWhite, styles.title]}>리뷰 작성</Text>
        <Text style={styles.subtitle}>({image.length}/5 , 사진 1개당 400KB 제한)</Text>
      </View>

      {image.length ? (
        <Image imageArray={image} setImage={setImage} addImage={onPress.image} />
      ) : (
        <TouchableOpacity onPress={onPress.image} style={styles.imageBtn}>
          <SVG.Icon.Camera width={20} height={16} />
          <Text style={styles.imageText}>사진 추가</Text>
        </TouchableOpacity>
      )}
      <View>
        <TextInput
          style={[styles.textInput, typography.subheadLong01, typography.textWhite]}
          onChangeText={text => setText(text)}
          placeholder="리뷰를 작성해주세요. (20자 이상)"
          placeholderTextColor={colors.OTBBlack500}
          multiline={true}
        />
        <Text style={[typography.caption, styles.count]}>({text.length}/1000)</Text>
      </View>

      <View style={styles.buttonContainer}>
        <OTBButton
          type="medium-secondary"
          text="취소"
          style={[styles.button, {marginRight: 4}]}
          onPress={onPress.cancel}
        />
        <OTBButton
          type="medium-primary"
          text="등록"
          style={[styles.button, {marginLeft: 4}]}
          onPress={onPress.submit}
        />
      </View>

      <Modal.Warn
        visible={submitVisible}
        title="리뷰를 등록하시겠습니까?"
        onRequestClose={closeSubmitModal}
        dismissible
      />
      <Modal.Warn
        visible={cancelVisible}
        title={`지금 취소시\n작성된 내용이 사라집니다.`}
        description="그래도 작성을 취소하시겠습니까?"
        onRequestClose={closeCancelModal}
        dismissible
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {marginBottom: 8},
  subtitle: {color: colors.OTBBlack500},
  review: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
    alignItems: "center",
  },
  rate: {flexDirection: "row", alignItems: "center"},
  rateText: {marginLeft: 8, marginTop: 8},
  imageBtn: {
    backgroundColor: colors.OTBBlack200,
    height: 48,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  imageText: {
    color: colors.OTBBlack,
    fontWeight: "700",
    lineHeight: 20,
    marginLeft: 8,
  },
  textInput: {
    height: 200,
    backgroundColor: colors.OTBBlack700,
    marginTop: 8,
    borderRadius: 4,
    padding: 12,
    textAlignVertical: "top",
    paddingTop: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  button: {
    borderRadius: 4,
    flex: 1,
  },
  count: {
    position: "absolute",
    right: 8,
    bottom: 8,
    color: colors.OTBBlack500,
  },
  search: {
    width: "100%",
    height: 48,
    backgroundColor: colors.OTBBlack700,
    borderRadius: 4,
    padding: 16,
  },
});
