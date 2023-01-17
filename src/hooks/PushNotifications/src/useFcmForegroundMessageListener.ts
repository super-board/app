import React, {useEffect} from "react";

import messaging, {FirebaseMessagingTypes} from "@react-native-firebase/messaging";

function useFcmForegroundMessageListener(
  onMessage: (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => Promise<void>,
) {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(onMessage);
    return unsubscribe;
  }, [onMessage]);
}

export default useFcmForegroundMessageListener;
