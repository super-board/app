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
      .then(token => {
        // FIXME: 서버 저장 후에는 토큰 값 콘솔에 찍지 말기
        console.log(token);

        return saveTokenToDatabase(token);
      });

    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
    });
  }, []);
}
