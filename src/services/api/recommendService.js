import { authInstance } from "../axiosInstance";
import { DOMAIN } from "../domain";

// 선택한 콘텐츠 배열을 받아 추천 OTT를 요청
export const postRecommendOtts = async (selectedContents) => {
  console.log("selectedContents: ", selectedContents);
  const payload = {
    contents: selectedContents.map((item) => ({
      contentId: item.contentId,
      title: item.title,
      poster: item.poster,
      ottName: item.ottName,
    })),
  };

  console.log("payload to backend:", payload);

  const res = await authInstance.post(DOMAIN.USER_RECOMMEND, payload);
  return res.data;
};
