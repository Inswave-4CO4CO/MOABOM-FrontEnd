import api from "./api";
import { authInstance } from "./axiosInstance";

export const getContentById = (contentID) => {
  return authInstance.get(`/content/${contentID}`);
};

export const getReviewByPage = (contentID, page) => {
  return api.get(`/content/${contentID}/review?page=${page}`);
};
