import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api/auth";
import { toast } from "react-toastify";
import useAuthStore from "../store/useAuthStore";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setLogin } = useAuthStore();

  const { mutate: userLogin } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data) {
        setLogin(data.accessToken);

        console.log("zustand store:", useAuthStore.getState());
        toast.success("로그인 성공!");
        navigate("/");
      }
      console.log(data);
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || "문제가 발생했습니다.");
      console.error(e);
    },
  });

  return { userLogin };
};
