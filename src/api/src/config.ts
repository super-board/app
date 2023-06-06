import axios from "axios";

import {network} from "@/constants/network";
import {useAuthStore} from "@/zustand-stores";

const DEFAULT_OPTIONS = {
  baseURL: network.OTB_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

export const axiosPublic = axios.create(DEFAULT_OPTIONS);

axiosPublic.interceptors.response.use(
  response => {
    if (response.config.url?.includes("auth/sign-in")) {
      const {saveTokens} = useAuthStore.getState();
      saveTokens(response.headers.authorization, response.headers.refreshtoken);
    }
    return response.data;
  },
  error => Promise.reject(error),
);

export const axiosAuthenticated = axios.create(DEFAULT_OPTIONS);

axiosAuthenticated.interceptors.request.use(
  request => {
    const {accessToken} = useAuthStore.getState();
    if (accessToken) {
      request.headers.Authorization = accessToken;
    }
    return request;
  },
  error => Promise.reject(error),
);

axiosAuthenticated.interceptors.response.use(
  response => response.data,
  error => {
    const {reissueTokens} = useAuthStore.getState();

    // AccessToken 만료시 인증토큰 재발급 시도
    if (!error.config.url.includes("auth/password-check") && error.response.state === 401) {
      return reissueTokens().then(() => axiosAuthenticated.request(error.config));
    }

    return Promise.reject(error);
  },
);
