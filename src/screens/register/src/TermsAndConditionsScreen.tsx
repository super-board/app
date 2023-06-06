import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";

import type {BottomSheetBackdropProps} from "@gorhom/bottom-sheet";
import {BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView} from "@gorhom/bottom-sheet";
import {useMutation} from "@tanstack/react-query";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

import {api} from "@/api";
import {FlexEmptyFill, OTBButton, OTBSwitch, ScreenTitle, SizedBox} from "@/components";
import colors from "@/constants/colors";
import officialDocuments, {OfficialDocuments} from "@/constants/officialDocuments";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {RegisterForm} from "@/types";
import {useOnboardingStore} from "@/zustand-stores";

export default function TermsAndConditionsScreen({navigation, route}: ScreenProps) {
  const [didAgreeAll, setDidAgreeAll] = useState(false);
  const [isOlderThan14, setIsOlderThan14] = useState(false);
  const [didAgreePersonalInformationCollection, setDidAgreePersonalInformationCollection] =
    useState(false);
  const [didAgreeTermsAndConditions, setDidAgreeTermsAndConditions] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetSnapPoints = useMemo(() => ["40%", "100%"], []);
  const [bottomSheetContent, setBottomSheetContent] = useState<keyof OfficialDocuments>(
    "personalInformationCollection",
  );

  const {completeOnboarding} = useOnboardingStore();
  const {
    mutate: signUp,
    isLoading: isSigningUp,
    isSuccess: isSuccessToSignUp,
  } = useMutation(["members/sign-up"], api.member.signUpWithEmailAndPassword);
  const {
    mutate: signIn,
    isLoading: isSigningIn,
    isSuccess: isSuccessToSignIn,
  } = useMutation(["auth/sign-in"], api.auth.signIn);

  const onToggleAgreeAll = () => {
    const toBe = !didAgreeAll;
    setDidAgreeAll(toBe);
    setIsOlderThan14(toBe);
    setDidAgreePersonalInformationCollection(toBe);
    setDidAgreeTermsAndConditions(toBe);
  };

  const onOpenPersonalInformationCollectionDocument = () => {
    setBottomSheetContent("personalInformationCollection");
    bottomSheetModalRef.current?.present();
  };

  const onOpenTermsAndConditionsDocument = () => {
    setBottomSheetContent("termsAndConditions");
    bottomSheetModalRef.current?.present();
  };

  const renderBottomSheetBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />,
    [],
  );

  const onSignUp = () => {
    signUp({...route.params} as RegisterForm);
  };

  /* 회원가입에 성공하면 온보딩 결과 저장 및 로그인*/
  useEffect(() => {
    if (!isSuccessToSignUp) return;

    const {email, password, tagIds} = route.params as RegisterForm;
    completeOnboarding();
    signIn({email, password});
  }, [isSuccessToSignUp]);

  /* 로그인 성공하면 권한부여 화면으로 이동 */
  useEffect(() => {
    if (isSuccessToSignIn)
      navigation.navigate("PermissionGrantNoticeScreen", {shouldWelcome: true});
  }, [isSuccessToSignIn]);

  /* 동의 여부에 따라 전체 동의 토글 상태 변경 */
  useEffect(() => {
    if (isOlderThan14 && didAgreePersonalInformationCollection && didAgreeTermsAndConditions)
      return setDidAgreeAll(true);
    setDidAgreeAll(false);
  }, [isOlderThan14, didAgreePersonalInformationCollection, didAgreeTermsAndConditions]);

  return (
    <View style={style.screenWithAppBarContainer}>
      <ScreenTitle title="이용약관 동의" />
      <SizedBox height={40} />

      <View style={styles.row}>
        <Text style={[typography.subhead01, styles.text]}>모든 항목 동의</Text>
        <OTBSwitch isOn={didAgreeAll} onToggle={onToggleAgreeAll} />
      </View>
      <SizedBox height={16} />
      <View style={styles.row}>
        <Text style={[typography.body02, styles.text]}>
          <Text>[필수]</Text>
          <SizedBox width={8} />
          <Text>만 14세 이상입니다.</Text>
        </Text>
        <OTBSwitch isOn={isOlderThan14} onToggle={() => setIsOlderThan14(state => !state)} />
      </View>
      <SizedBox height={16} />
      <View style={styles.row}>
        <Text style={[typography.body02, styles.text]}>
          <Text>[필수]</Text>
          <SizedBox width={8} />
          <TouchableOpacity
            style={styles.link}
            activeOpacity={1}
            onPress={onOpenPersonalInformationCollectionDocument}>
            <Text style={[typography.body02, styles.text]}>개인 정보 수집 및 이용</Text>
          </TouchableOpacity>
          <Text>에 동의합니다.</Text>
        </Text>
        <OTBSwitch
          isOn={didAgreePersonalInformationCollection}
          onToggle={() => setDidAgreePersonalInformationCollection(state => !state)}
        />
      </View>
      <SizedBox height={16} />
      <View style={styles.row}>
        <Text style={[typography.body02, styles.text]}>
          <Text>[필수]</Text>
          <SizedBox width={8} />
          <TouchableOpacity
            style={styles.link}
            activeOpacity={1}
            onPress={onOpenTermsAndConditionsDocument}>
            <Text style={[typography.body02, styles.text]}>이용약관</Text>
          </TouchableOpacity>
          <Text>에 동의합니다.</Text>
        </Text>
        <OTBSwitch
          isOn={didAgreeTermsAndConditions}
          onToggle={() => setDidAgreeTermsAndConditions(state => !state)}
        />
      </View>

      <FlexEmptyFill />
      <OTBButton
        type="basic-primary"
        text="완료"
        onPress={onSignUp}
        disabled={!didAgreeAll || isSigningUp || isSigningIn}
      />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={bottomSheetSnapPoints}
        backgroundStyle={styles.bottomSheetContainer}
        handleIndicatorStyle={styles.handleIndicator}
        backdropComponent={renderBottomSheetBackdrop}>
        <BottomSheetScrollView contentContainerStyle={styles.bottomSheetContentContainer}>
          <Text style={[typography.subhead01, typography.textWhite, styles.titleText]}>
            {officialDocuments[bottomSheetContent].title}
          </Text>
          <SizedBox height={16} />
          <Text style={[typography.caption, typography.textWhite, styles.contentText]}>
            {officialDocuments[bottomSheetContent].content}
          </Text>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {color: colors.OTBBlack100, alignSelf: "center", alignItems: "center"},
  link: {borderBottomColor: colors.white, borderBottomWidth: 1, transform: [{translateY: 5}]},
  bottomSheetContainer: {
    backgroundColor: colors.OTBBlack800,
  },
  handleIndicator: {
    width: 36,
    height: 5,
    borderRadius: 5,
    backgroundColor: colors.OTBBlack300,
    opacity: 0.3,
  },
  bottomSheetContentContainer: {
    paddingHorizontal: "10%",
    alignItems: "stretch",
  },
  titleText: {
    alignSelf: "center",
  },
  contentText: {
    textAlign: "left",
  },
});
