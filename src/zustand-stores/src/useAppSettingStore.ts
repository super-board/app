import {create} from "zustand";

type AppSettingState = {
  didAppInitialized: boolean;
};

type AppSettingAction = {
  initializeApp: () => void;
};

const useAppSettingStore = create<AppSettingState & AppSettingAction>()(set => ({
  didAppInitialized: false,
  initializeApp: () => set({didAppInitialized: true}),
}));

export default useAppSettingStore;
