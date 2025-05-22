import { authInstance, baseInstance } from "../axiosInstance";
import { DOMAIN } from "../domain";

//한줄평 단건 조회
export const getReviewByPage = (contentID, page) => {
  return baseInstance.get(DOMAIN.REVIEW_BY_PAGE(contentID, page));
};

//한줄평 조회
export const findByContentIdAndUserId = (contentId) => {
  return authInstance.get(DOMAIN.USER_REVIEW_BY_ID(contentId));
};

//한줄평 추가
export const createReview = (reviewText, rating, contentId) => {
  return authInstance.post(DOMAIN.USER_REVIEW, {
    reviewText,

    rating,
    contentId,
  });
};

//한줄평 수정
export const modifyReview = (reviewId, reviewText, rating) => {
  return authInstance.put(DOMAIN.USER_REVIEW, {
    reviewId,
    reviewText,
    rating,
  });
};

//한줄평 삭제
export const deleteReview = (reviewId) => {
  return baseInstance.delete(DOMAIN.USER_REVIEW_DELETE(reviewId));
};
