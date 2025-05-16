import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import { toast } from "react-toastify";

export const useLogin = () => {
  const navigate = useNavigate();
  const { mutate: userLogin } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data) {
        // todo: token 저장 로직
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
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
