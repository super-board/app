import React, {useEffect, useState} from "react";

import {Button, Cacnel, KeyboardView, TextInput, Title} from "@/components";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";

const Nickname = (props: ScreenProps) => {
  const {navigation, route} = props;
  const [nickname, setNickname] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Cacnel />,
    });
  }, []);

  const onPress = {
    next: () => {
      // navigation.navigate("Home", {...route.params, nickname})
    },
  };

  return (
    <KeyboardView>
      <Title title="닉네임 설정" subTitle="서비스 이용에 사용할 닉네임을 설정해주세요" />
      <TextInput
        title="닉네임"
        text={nickname}
        bottomText="특수기호 제외하여 10자이내 한글로 입력해주세요."
        setText={setNickname}
        setIsValid={setIsValid}
        maxLength={10}
      />
      <Button text="다음" onPress={onPress.next} disabled={!isValid} style={style.nextBtn} />
    </KeyboardView>
  );
};

export default Nickname;
