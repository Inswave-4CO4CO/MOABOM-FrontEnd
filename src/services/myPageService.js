import { authInstance } from "./axiosInstance";

//장르별 컨텐츠 조회
export const getMyGenreContents = () => {
  return authInstance.get(`/user/stats`);
};

//봤다 + 보는중 개수 조회
export const getMyWatchCount = () => {
  return authInstance.get(`/user/count`);
};

//한줄평
export const getMyReviewList = (page) => {
  return authInstance.get(`/user/comments?page=${page}`);
};
