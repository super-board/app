import {create} from "zustand";

import keys from "@/constants/keys";
import {AsyncStorageService} from "@/services/storage";

type OnboardingState = {
  shouldRequestOnboarding: boolean;
};

type OnboardingAction = {
  loadOnboardingStatus: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
};

const useOnboardingStore = create<OnboardingState & OnboardingAction>()(set => ({
  shouldRequestOnboarding: true,
  loadOnboardingStatus: async () => {
    set({shouldRequestOnboarding: !(await AsyncStorageService.getData(keys.ONBOARDING_COMPLETED))});
  },
  completeOnboarding: async () => {
    set({shouldRequestOnboarding: false});
    await AsyncStorageService.saveData(keys.ONBOARDING_COMPLETED, true);
  },
}));

export default useOnboardingStore;
