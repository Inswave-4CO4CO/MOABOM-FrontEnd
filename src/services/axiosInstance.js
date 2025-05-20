import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import { DOMAIN } from "./domain";

const { VITE_API_URL } = import.meta.env;

export const baseInstance = axios.create({ baseURL: VITE_API_URL });

export const authInstance = axios.create({
  baseURL: VITE_API_URL,
});

// 요청 인터셉터: access token 자동 추가
authInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 에러 시 토큰 재발급 및 재요청
authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { isLogin, setLogin } = useAuthStore.getState();

    // 로그아웃 상태
    if (!isLogin) {
      return;
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // refresh token으로 access token 재발급
      const res = await baseInstance.post(
        DOMAIN.REFRESH_ACCESSS_TOKEN,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        const newAccessToken = res.data.token;
        setLogin(newAccessToken);
        // console.log("newAccessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return authInstance(originalRequest); // 실패한 요청 재시도
      }
    }
    return Promise.reject(error);
  }
);
