import React from "react";

import {FirebaseMessagingTypes} from "@react-native-firebase/messaging";
import {Alert} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";

import Reducer from "@/_reducers";
import {useFcmForegroundMessageListener, useFcmTokenSave} from "@/hooks/PushNotifications";
import Navigation from "@/navigation";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

const store = createStoreWithMiddleware(Reducer, composeEnhancers());

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
