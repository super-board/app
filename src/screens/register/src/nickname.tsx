import React, {useState} from "react";

import {FlexEmptyFill, KeyboardView, OTBButton, SizedBox, TextInput, Title} from "@/components";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";

const Nickname = ({navigation}: ScreenProps) => {
  const [nickname, setNickname] = useState("");
  const [isValid, setIsValid] = useState(false);

  const onPress = {
    next: () => {
      // navigation.navigate("Home", {...route.params, nickname})
    },
  };

  return (
    <KeyboardView style={style.screenWithAppBarContainer}>
      <Title title="닉네임 설정" subTitle="서비스 이용에 사용할 닉네임을 설정해주세요" />
      <TextInput
        title="닉네임"
        text={nickname}
        bottomText="특수기호 제외하여 10자이내 한글로 입력해주세요."
        setText={setNickname}
        setIsValid={setIsValid}
        maxLength={10}
      />

      <FlexEmptyFill />
      <OTBButton type="basic-primary" text="다음" onPress={onPress.next} disabled={!isValid} />
      <SizedBox height={36} />
    </KeyboardView>
  );
};

export default Nickname;
