import React from "react";

import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {FirebaseMessagingTypes} from "@react-native-firebase/messaging";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Alert, StatusBar} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {SafeAreaProvider} from "react-native-safe-area-context";

import colors from "@/constants/colors";
import {useFcmForegroundMessageListener, useFcmTokenSave} from "@/hooks";
import Navigation from "@/navigation";

const queryClient = new QueryClient();

export default function App() {
  useFcmTokenSave();
  useFcmForegroundMessageListener(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    Alert.alert(JSON.stringify(remoteMessage));
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar backgroundColor={colors.OTBBlack} />
        <GestureHandlerRootView style={{flex: 1}}>
          <BottomSheetModalProvider>
            <Navigation />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
