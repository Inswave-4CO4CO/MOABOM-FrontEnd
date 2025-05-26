import { authInstance } from "../axiosInstance";
import { DOMAIN } from "../domain";

//시청상태 추가(보고싶다, 보는중, 봤다)
export const createWatch = (contentId, type, genre) => {
  return authInstance.post(DOMAIN.USER_WATCH, { contentId, type, genre });
};

//시청상태 수정(보고싶다, 보는중, 봤다)
export const modifyWatch = (contentId, type, genre) => {
  return authInstance.put(DOMAIN.USER_WATCH, { contentId, type, genre });
};

//시청상태 삭제(보고싶다, 보는중, 봤어요)
export const deleteWatch = ({ contentId, type, genre }) => {
  return authInstance.delete(DOMAIN.USER_WATCH, {
    data: { contentId, type, genre },
  });
};
