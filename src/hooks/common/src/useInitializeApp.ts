import {useCheckOnboardingCompleted} from "@/hooks/onboarding";

import useSelectedTagIds from "./useSelectedTagIds";

export default function useInitializeApp() {
  const {loadSelectedTags} = useSelectedTagIds();
  const {checkOnboardingCompleted} = useCheckOnboardingCompleted();

  const initializeApp = () => {
    loadSelectedTags();
    checkOnboardingCompleted();
  };

  return {initializeApp};
}
