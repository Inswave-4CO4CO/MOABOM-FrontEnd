import { authInstance } from "./axiosInstance";

//장르별 컨텐츠 조회
export const getMyGenreContents = () => {
  return authInstance.get(`/user/stats`);
};
