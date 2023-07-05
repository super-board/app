import React from "react";

import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {StatusBar} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {SafeAreaProvider} from "react-native-safe-area-context";

import colors from "@/constants/colors";
import Navigation from "@/navigation";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar animated={true} backgroundColor={colors.OTBBlack} barStyle="light-content" />
        <GestureHandlerRootView style={{flex: 1}}>
          <BottomSheetModalProvider>
            <Navigation />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
