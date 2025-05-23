import { baseInstance } from "../axiosInstance";
import { DOMAIN } from "../domain";

export const fetchMainContent = async () => {
  const res = await baseInstance.get(DOMAIN.MAIN_CONTENT);
  return res.data;
};
