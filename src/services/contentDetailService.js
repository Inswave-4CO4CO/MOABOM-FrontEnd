import api from "./api";

export const getContentById = (contentID) => {
  return api.get(`/content/${contentID}`);
};
