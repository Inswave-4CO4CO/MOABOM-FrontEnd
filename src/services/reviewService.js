import api from "./api";
import { authInstance } from "./axiosInstance";

//한줄평 단건 조회
export const getReviewByPage = (contentID, cursor) => {
  return api.get(`/content/${contentID}/review?cursor=${cursor}`);
};

//한줄평 조회
export const findByContentIdAndUserId = (contentId) => {
  return authInstance.get(`/review?contentId=${contentId}`);
};

//한줄평 추가
export const createReview = (reviewText, createdAt, rating, contentId) => {
  return authInstance.post(`/review`, {
    reviewText,
    createdAt,
    rating,
    contentId,
  });
};

//한줄평 수정
export const modifyReview = (
  reviewId,
  reviewText,
  createdAt,
  rating,
  contentId
) => {
  return authInstance.put(`/review`, {
    reviewId,
    reviewText,
    createdAt,
    rating,
    contentId,
  });
};

//한줄평 삭제
export const deleteReview = (reviewId) => {
  return api.delete(`/review/${reviewId}`);
};
