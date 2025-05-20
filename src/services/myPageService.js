import api from "./api";

//한줄평 단건 조회
export const getReviewByPage = (contentID, cursor) => {
  return api.get(`/content/${contentID}/review?cursor=${cursor}`);
};
