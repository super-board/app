import React from "react";

import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {FirebaseMessagingTypes, firebase} from "@react-native-firebase/messaging";
import {Alert, StatusBar} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";

import colors from "@/constants/colors";
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
        <StatusBar backgroundColor={colors.OTBBlack} />
        <GestureHandlerRootView style={{flex: 1}}>
          <BottomSheetModalProvider>
            <Navigation />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}
