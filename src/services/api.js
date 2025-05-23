import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8090",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchUserData = () => {
  return api.get("/user");
};

export default api;
