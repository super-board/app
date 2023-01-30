import React from "react";

import {StatusBar} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";

import colors from "@/constants/colors";
import Navigation from "@/navigation";
import {store} from "@/store";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar backgroundColor={colors.OTBBlack} />
        <Navigation />
      </SafeAreaProvider>
    </Provider>
  );
}
