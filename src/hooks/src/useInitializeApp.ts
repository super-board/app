import {
  useAuthStore,
  useFavoriteTagsStore,
  useOnboardingStore,
  usePermissionGrantStore,
} from "@/zustand-stores";

export default function useInitializeApp() {
  const {loadOnboardingStatus} = useOnboardingStore();
  const {loadAuthState} = useAuthStore();
  const {loadFavoriteTags} = useFavoriteTagsStore();
  const {loadPermissionGrantStatus} = usePermissionGrantStore();

  const initializeApp = async () => {
    await Promise.allSettled([
      // loadOnboardingStatus(),
      // loadAuthState(),
      loadFavoriteTags(),
      loadPermissionGrantStatus(),
    ]);
  };

  return {initializeApp};
}
