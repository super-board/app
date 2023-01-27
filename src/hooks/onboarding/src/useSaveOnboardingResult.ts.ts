import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {saveOnboardingResultAsync} from "@/store";

function useSaveOnboardingResult() {
  const isSubmitting = useAppSelector(state => state.onboarding.loading === "pending");
  const interestTagIds = useAppSelector(state => state.interestTag.selectedTagIds);

  const dispatch = useAppDispatch();
  const saveOnboardingResult = () => dispatch(saveOnboardingResultAsync(interestTagIds));

  return {isSubmitting, saveOnboardingResult};
}

export default useSaveOnboardingResult;
