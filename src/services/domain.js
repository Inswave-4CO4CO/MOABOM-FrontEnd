// parameter로 보내는 경우
// DOMAIN_NAME: (parameter) => `/hi/${parameter}`
export const DOMAIN = {
  LOGIN_USER: "/auth/login",
  SIGNUP_USER: "/auth/signup",
  LOGOUT_USER: "auth/logout",
  REISSUE_TOKEN: "/auth/reissue",
  CHECK_ID: "/auth/checkId",
  REFRESH_ACCESSS_TOKEN: "/auth/refresh",
  SEARCH: "/search",
  PERSON_DETAIL: (personId) => `/person/${personId}`,
  MAIN_CONTENT: "/content",

  USER_INFO: "/user",
  CHANGE_PASSWORD: "/user/password",

  //마이페이지
  MYPAGE_GENRE_CONTENTS: "/user/stats",
  MYPAGE_WATCH_COUNT: "/user/count",
  MYPAGE_REVIEW_LIST: (page) => `/user/comments?page=${page}`,
  MYPAGE_WATCHING_CONTENTS: (page, ottNames) => {
    const params = new URLSearchParams();
    params.append("page", page);
    ottNames.forEach((name) => params.append("ottNames", name));
    return `user/watching?${params.toString()}`;
  },
  MYPAGE_WATCHED_CONTENTS: (page, ottNames) => {
    const params = new URLSearchParams();
    params.append("page", page);
    ottNames.forEach((name) => params.append("ottNames", name));
    return `user/watched?${params.toString()}`;
  },

  //시청상태
  USER_WATCH: "/content/watch",
  USER_WATCH_DELETE: (contentId) => `/content/watch/${contentId}`,

  //한줄평
  REVIEW_BY_PAGE: (contentID, page) =>
    `/content/${contentID}/review?page=${page}`,
  USER_REVIEW_BY_ID: (contentId) => `/review?contentId=${contentId}`,
  USER_REVIEW: "/review",
  USER_REVIEW_DELETE: (reviewId) => `/review/${reviewId}`,

  //상세정보
  DETAIL_CONTENTS: (contentID) => `/content/${contentID}`,
  DETAIL_REVIEW: (contentID, page) =>
    `/content/${contentID}/review?page=${page}`,

  //보고싶은 작품
  USER_WISH: "/user/wishlist",

  //추천결과
  USER_RECOMMEND: "/recommend/ott",
};
