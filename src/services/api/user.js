import { authInstance } from "../axiosInstance";
import { DOMAIN } from "../domain";

// 내 정보 조회
export const getMyInfo = async () => {
  const res = await authInstance.get(DOMAIN.USER_INFO);
  return res.data;
};

// 내 정보 수정
export const changeMyInfo = async () => {
  const res = await authInstance.put(DOMAIN.USER_INFO);
  return res.data;
};

// 비밀번호 변경
export const changePassword = async () => {
  const res = await authInstance.put(DOMAIN.CHANGE_PASSWORD);
  return res.data;
};
