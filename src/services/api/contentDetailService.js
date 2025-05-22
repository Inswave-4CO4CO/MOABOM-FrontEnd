import { authInstance, baseInstance } from "../axiosInstance";
import { DOMAIN } from "../domain";

export const getContentById = (contentID) => {
  return authInstance.get(DOMAIN.DETAIL_CONTENTS(contentID));
};

export const getReviewByPage = (contentID, page) => {
  return baseInstance.get(DOMAIN.DETAIL_REVIEW(contentID, page));
};
