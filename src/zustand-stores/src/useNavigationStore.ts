import {create} from "zustand";

import {RootStackParamList} from "@/navigation/navigation";

type NavigationState = {
  reservedRoute: keyof RootStackParamList;
  params: RootStackParamList[keyof RootStackParamList];
};

type NavigationAction = {
  navigateAfterInitializing: (
    route: keyof RootStackParamList,
    params: RootStackParamList[keyof RootStackParamList],
  ) => void;
  reset: () => void;
};

const DEFAULT_STATE = {
  reservedRoute: "BottomTabView",
  params: {},
} as NavigationState;

const useNavigationStore = create<NavigationState & NavigationAction>()(set => ({
  ...DEFAULT_STATE,
  navigateAfterInitializing: (route, params) => {
    set({reservedRoute: route, params});
  },
  reset: () => set(DEFAULT_STATE),
}));

export default useNavigationStore;
