import { authInstance } from "./axiosInstance";

//시청상태 추가(보고싶다, 보는중, 봤다)
export const createWatch = (contentId, type) => {
  return authInstance.post(`/content/watch`, { contentId, type });
};

//시청상태 수정(보고싶다, 보는중, 봤다)
export const modifyWatch = (contentId, type) => {
  return authInstance.put(`/content/watch`, { contentId, type });
};

//시청상태 삭제(보고싶다, 보는중, 봤어요)
export const deleteWatch = (contentId) => {
  return authInstance.delete(`/content/watch/${contentId}`);
};
