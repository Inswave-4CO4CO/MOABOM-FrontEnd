import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkId, signup } from "../services/api/auth";
import { useState } from "react";

export const useSignup = () => {
  const navigate = useNavigate();
  const [isIdChecked, setIsIdChecked] = useState(false);

  const { mutate: userSignup } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("회원가입 성공!");
      navigate("/login");
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || "문제가 발생했습니다.");
    },
  });

  const { mutate: userIdCheck } = useMutation({
    mutationFn: checkId,
    onSuccess: (data) => {
      console.log(data.available);
      if (data.available) {
        toast.success("사용 가능한 아이디입니다.");
        setIsIdChecked(true);
      } else {
        toast.warn("이미 사용 중인 아이디입니다.");
        setIsIdChecked(false);
      }
    },
    onError: () => {
      toast.error("아이디 확인 실패");
      setIsIdChecked(false);
    },
  });

  return {
    userSignup,
    userIdCheck,
    setIsIdChecked,
    isIdChecked,
  };
};
