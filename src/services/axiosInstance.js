import axios from "axios";

const { VITE_API_URL } = import.meta.env;

export const baseInstance = axios.create({ baseURL: VITE_API_URL });
console.log(VITE_API_URL);
export const authInstance = axios.create({
  baseURL: VITE_API_URL,
});

// 요청 인터셉터: access token 자동 추가
authInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // refresh token으로 access token 재발급
      const refreshToken = localStorage.getItem("refreshToken");
      const res = await axios.post("/auth/refresh", { refreshToken });

      if (res.status === 201) {
        const newAccessToken = res.data.token;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return authInstance(originalRequest); // 실패한 요청 재시도
      }
    }
    return Promise.reject(error);
  }
);
