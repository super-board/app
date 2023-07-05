import {useEffect} from "react";

import messaging, {FirebaseMessagingTypes, firebase} from "@react-native-firebase/messaging";

import {useAuthStore} from "@/zustand-stores";

export default function useFcmTokenSave() {
  const didLogin = useAuthStore(state => !!state.accessToken);

  async function saveTokenToDatabase(token: string | undefined) {
    if (!didLogin || !token) return;

    console.log(token);
  }

  function hasPermission(status: FirebaseMessagingTypes.AuthorizationStatus) {
    return (
      status === firebase.messaging.AuthorizationStatus.AUTHORIZED ||
      firebase.messaging.AuthorizationStatus.PROVISIONAL
    );
  }

  async function createFCMToken(): Promise<string | undefined> {
    let authStatus = await messaging().hasPermission();
    if (hasPermission(authStatus)) authStatus = await messaging().requestPermission();
    if (!hasPermission(authStatus)) return;
    return await messaging().getToken();
  }

  useEffect(() => {
    createFCMToken().then(saveTokenToDatabase);

    return messaging().onTokenRefresh(saveTokenToDatabase);
  }, []);
}
