import { authInstance, baseInstance } from "../axiosInstance";
import { DOMAIN } from "../domain";

//'보고싶다' 작품 리스트 조회
export const getWishContents = async () => {
  const res = await authInstance.get(DOMAIN.USER_WISH);
  return res.data;
};
