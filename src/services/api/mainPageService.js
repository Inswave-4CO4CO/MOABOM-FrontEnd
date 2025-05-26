import { baseInstance } from "../axiosInstance";
import { DOMAIN } from "../domain";

//공개예정작, 신작, 인기작, 종료예정작 조회
export const getMainContents = async () => {
  const res = await baseInstance.get(DOMAIN.MAIN_CONTENT);
  return res.data;
};
