import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../services/api/auth";
import { toast } from "react-toastify";
import useAuthStore from "../store/useAuthStore";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setLogin, setLogout } = useAuthStore();

  const { mutate: loginUser } = useMutation({
    mutationFn: login,
    onSuccess: (data, variables) => {
      if (data) {
        setLogin(data.accessToken, variables.userId);
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

  const { mutate: logoutUser } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("로그아웃 되었습니다.");
    },
    onMutate: () => {
      // 실패해도 토큰 삭제 > 보안적으로 좋음
      setLogout();
      navigate("/");
    },
  });

  return { loginUser, logoutUser };
};
