import { authInstance } from "../axiosInstance";
import { DOMAIN } from "../domain";

// 내 정보 조회
export const getMyInfo = async () => {
  const res = await authInstance.get(DOMAIN.USER_INFO);
  return res.data;
};

// 내 정보 수정
export const changeMyInfo = async ({ nickName, imageFile }) => {
  const formData = new FormData();

  formData.append(
    "request",
    new Blob([JSON.stringify({ nickName })], { type: "application/json" })
  );

  if (imageFile) {
    formData.append("profileImage", imageFile);
  }

  const res = await authInstance.post(DOMAIN.USER_INFO, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// 비밀번호 변경
export const changePassword = async ({ newPassword }) => {
  const res = await authInstance.put(DOMAIN.CHANGE_PASSWORD, { newPassword });
  return res.data;
};
