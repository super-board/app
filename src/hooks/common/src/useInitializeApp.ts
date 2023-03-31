import {useCheckOnboardingCompleted} from "@/hooks/onboarding";
import {useCheckPermissionGrantRequested} from "@/hooks/permssion";

import useLogin from "./useLogin";
import useSelectedTagIds from "./useSelectedTagIds";

export default function useInitializeApp() {
  const {loadSelectedTags} = useSelectedTagIds();
  const {login, checkShouldLogin} = useLogin();
  const {checkOnboardingCompleted} = useCheckOnboardingCompleted();
  const {checkPermissionGrantRequested} = useCheckPermissionGrantRequested();

  const initializeApp = async () => {
    await Promise.allSettled([loadSelectedTags(), checkShouldLogin(), login()]);
    checkOnboardingCompleted();
    checkPermissionGrantRequested();
  };

  return {initializeApp};
}
