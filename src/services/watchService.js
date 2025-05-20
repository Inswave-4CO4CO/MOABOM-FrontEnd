import api from "./api";

//시청상태 추가(보고싶다, 보는중, 봤다)
export const createWatch = (contentId, userId, type) => {
  return api.post(
    `/content/watch`,
    { contentId, type },
    {
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    }
  );
};

//시청상태 수정(보고싶다, 보는중, 봤다)
export const modifyWatch = (contentId, userId, type) => {
  return api.put(
    `/content/watch`,
    { contentId, type },
    {
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    }
  );
};

//시청상태 삭제(보고싶다, 보는중, 봤어요)
export const deleteWatch = (contentId, userId) => {
  return api.delete(`/content/watch/${contentId}`, {
    headers: {
      Authorization: `Bearer ${userId}`,
    },
    params: {
      userId,
    },
  });
};
