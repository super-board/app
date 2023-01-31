import {useCheckOnboardingCompleted, useSelectedTagIds} from "@/hooks/onboarding";

export default function useInitializeApp() {
  const {loadSelectedTags} = useSelectedTagIds();
  const {checkOnboardingCompleted} = useCheckOnboardingCompleted();

  const initializeApp = () => {
    loadSelectedTags();
    checkOnboardingCompleted();
  };

  return {initializeApp};
}
