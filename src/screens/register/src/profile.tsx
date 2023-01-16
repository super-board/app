import React, {useEffect, useState} from "react";

import {NavigationProp, ParamListBase, RouteProp} from "@react-navigation/native";
import {StyleSheet, View} from "react-native";

import {Button, Cacnel, Title} from "@/components";
import style from "@/constants/style";

const Profile = (props: {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}) => {
  const {navigation, route} = props;
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Cacnel />,
    });
  }, []);

  return (
    <View style={style.container}>
      <Title title="프로필 캐릭터 선택" />
      <Button
        text="다음"
        onPress={() => navigation.navigate("RegisterProfile", {...route.params})}
        disabled={disabled}
        style={style.nextBtn}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
