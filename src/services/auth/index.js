import { authInstance, baseInstance } from "../axiosInstance";
import { DOMAIN } from "../domain";

/**
 * @summary 회원가입
 * @argument 사용자 정보 (userId, password, nickName)
 * @returns
 */
export const signup = async ({ userId, password, nickName }) => {
  try {
    const res = await baseInstance.post(DOMAIN.SIGNUP_USER, {
      userId,
      password,
      nickName,
    });
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

/**
 * @summary 로그인
 * @argument 사용자 입력값 (userId, password)
 * @returns
 */
export const login = async ({ userId, password }) => {
  try {
    const res = await baseInstance.post(DOMAIN.LOGIN_USER, {
      userId,
      password,
    });
    console.log(DOMAIN.LOGIN_USER);
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

/**
 * @summary 로그아웃
 * @returns 로그아웃 성공여부
 */
export const logout = async () => {
  try {
    await authInstance.post(DOMAIN.LOGOUT_USER);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

/**
 * @summary 사용자 인증여부 확인 (로그인한 사용자인지 확인)
 * @returns
 */
export const checkAuth = async () => {
  try {
    const res = await authInstance.post(DOMAIN.CHECK_AUTH);
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
