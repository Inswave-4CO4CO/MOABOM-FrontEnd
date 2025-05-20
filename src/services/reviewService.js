import api from "./api";

//한줄평 단건 조회
export const getReviewByPage = (contentID, cursor) => {
  return api.get(`/content/${contentID}/review?cursor=${cursor}`);
};

//한줄평 조회
export const findByContentIdAndUserId = (contentId, userId) => {
  return api.get(`/review?contentId=${contentId}`, {
    headers: {
      Authorization: `Bearer ${userId}`,
    },
  });
};

//한줄평 추가
export const createReview = (
  reviewText,
  createdAt,
  rating,
  contentId,
  userId
) => {
  return api.post(
    `/review`,
    {
      reviewText,
      createdAt,
      rating,
      contentId,
    },
    {
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    }
  );
};

//한줄평 수정
export const modifyReview = (
  reviewId,
  reviewText,
  createdAt,
  rating,
  contentId,
  userId
) => {
  return api.put(
    `/review`,
    {
      reviewId,
      reviewText,
      createdAt,
      rating,
      contentId,
    },
    {
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    }
  );
};

//한줄평 삭제
export const deleteReview = (reviewId) => {
  return api.delete(`/review/${reviewId}`);
};
