import React from "react";

import {FirebaseMessagingTypes} from "@react-native-firebase/messaging";
import {Alert} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";

import {useFcmForegroundMessageListener, useFcmTokenSave} from "@/hooks/PushNotifications";
import Navigation from "@/navigation";
import {store} from "@/store";

export default function App() {
  useFcmTokenSave();
  useFcmForegroundMessageListener(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    Alert.alert(JSON.stringify(remoteMessage));
  });

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </Provider>
  );
}
