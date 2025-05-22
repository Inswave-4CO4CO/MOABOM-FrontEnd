import { authInstance } from "../axiosInstance";
import { DOMAIN } from "../domain";

//장르별 컨텐츠 조회
export const getMyGenreContents = () => {
  return authInstance.get(DOMAIN.MYPAGE_GENRE_CONTENTS);
};

//봤다 + 보는중 개수 조회
export const getMyWatchCount = () => {
  return authInstance.get(DOMAIN.MYPAGE_WATCH_COUNT);
};

//한줄평
export const getMyReviewList = (page) => {
  return authInstance.get(DOMAIN.MYPAGE_REVIEW_LIST(page));
};

//보는중 시청 데이터 (5개)
export const getMyWatchingContents = (page, ottNames) => {
  return authInstance.get(DOMAIN.MYPAGE_WATCHING_CONTENTS(page, ottNames));
};

//봤다 시청 데이터 (5개)
export const getMyWatchedContents = (page, ottNames) => {
  return authInstance.get(DOMAIN.MYPAGE_WATCHED_CONTENTS(page, ottNames));
};
