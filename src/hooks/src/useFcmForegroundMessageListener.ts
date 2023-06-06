import {useEffect} from "react";

import messaging, {FirebaseMessagingTypes} from "@react-native-firebase/messaging";

export default function useFcmForegroundMessageListener(
  onMessage: (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => Promise<void>,
) {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(onMessage);
    return unsubscribe;
  }, [onMessage]);
}
