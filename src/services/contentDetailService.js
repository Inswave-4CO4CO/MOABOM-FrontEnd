import api from "./api";

export const getContentById = (contentID, userId) => {
  return api.get(`/content/${contentID}`, {
    headers: {
      Authorization: `Bearer ${userId}`,
    },
  });
};

export const getReviewByPage = (contentID, page) => {
  return api.get(`/content/${contentID}/review?page=${page}`);
};
