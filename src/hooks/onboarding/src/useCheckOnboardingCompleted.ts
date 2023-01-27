import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {checkOnboardingCompletedAsync} from "@/store";

export default function useCheckOnboardingCompleted() {
  const shouldRequestOnboarding = useAppSelector(state => state.onboarding.shouldRequestOnboarding);
  const isLoading = useAppSelector(state => state.onboarding.loading !== "success");

  const dispatch = useAppDispatch();
  const checkOnboardingCompleted = () => dispatch(checkOnboardingCompletedAsync());

  return {isLoading, shouldRequestOnboarding, checkOnboardingCompleted};
}
