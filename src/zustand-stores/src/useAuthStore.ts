import axios from "axios";
import {create} from "zustand";

import keys from "@/constants/keys";
import {network} from "@/constants/network";
import {AsyncStorageService, SecureStorageService} from "@/services/storage";

type AuthStoreState = {
  shouldLogin: boolean;
  accessToken: string | null;
  refreshToken: string | null;
};

type AuthStoreAction = {
  loadAuthState: () => Promise<void>;
  saveTokens: (accessToken?: string, refreshToken?: string) => void;
  reissueTokens: () => Promise<void>;
  logout: () => void;
};

const useAuthStore = create<AuthStoreState & AuthStoreAction>()((set, get) => ({
  shouldLogin: false,
  accessToken: null,
  refreshToken: null,
  loadAuthState: async () => {
    const shouldLogin = await AsyncStorageService.getData(keys.SHOULD_LOGIN);
    const refreshToken = await SecureStorageService.getData(keys.REFRESH_TOKEN);
    set({shouldLogin, refreshToken});
    if (refreshToken) get().reissueTokens();
  },
  saveTokens: (accessToken?: string, refreshToken?: string) => {
    if (!accessToken || !refreshToken) return;
    set({shouldLogin: false, accessToken, refreshToken});
    AsyncStorageService.removeData(keys.SHOULD_LOGIN);
    SecureStorageService.saveData(keys.REFRESH_TOKEN, refreshToken);
  },
  reissueTokens: async () => {
    const {refreshToken, saveTokens, logout} = get();
    try {
      if (!refreshToken) return;
      const {headers} = await axios.get(`${network.OTB_API_BASE_URL}/auth/token-reissue`, {
        headers: {RefreshToken: refreshToken},
      });
      saveTokens(headers.authorization, headers.refreshtoken);
    } catch (e) {
      logout();
    }
  },
  logout: () => {
    set({shouldLogin: true, accessToken: null, refreshToken: null});
    AsyncStorageService.saveData(keys.SHOULD_LOGIN, true);
    SecureStorageService.removeData(keys.REFRESH_TOKEN);
  },
}));

export default useAuthStore;
