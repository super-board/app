import {useEffect} from "react";

import messaging from "@react-native-firebase/messaging";

export default function useFcmTokenSave() {
  async function saveTokenToDatabase(token: string) {
    // TODO: 사용자 로그인 인증 확인
    // TODO: 실제 DB에 저장하는 로직 추가
  }

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => saveTokenToDatabase(token));

    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
    });
  }, []);
}
