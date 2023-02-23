import {useCheckOnboardingCompleted} from "@/hooks/onboarding";

import useLogin from "./useLogin";
import useSelectedTagIds from "./useSelectedTagIds";

export default function useInitializeApp() {
  const {loadSelectedTags} = useSelectedTagIds();
  const {login} = useLogin();
  const {checkOnboardingCompleted} = useCheckOnboardingCompleted();

  const initializeApp = () => {
    loadSelectedTags();
    login();
    checkOnboardingCompleted();
  };

  return {initializeApp};
}
