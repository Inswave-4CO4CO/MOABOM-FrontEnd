import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8090/", // 실제 백엔드 API 주소로 수정
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchUserData = () => {
  return api.get("/user");
};

export default api;
