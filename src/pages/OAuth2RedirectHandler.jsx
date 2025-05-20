import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../store/useAuthStore";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const { setLogin } = useAuthStore();
  const alreadyNavigatedRef = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");

    if (accessToken) {
      setLogin(accessToken);
      toast.success("구글 로그인 성공!");
      alreadyNavigatedRef.current = true;
      setTimeout(() => navigate("/"), 1000);
    } else {
      if (!alreadyNavigatedRef.current) {
        toast.error("구글 로그인에 실패했습니다.");
        setTimeout(() => navigate("/"), 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return <div>구글 로그인 처리 중...</div>;
};

export default OAuth2RedirectHandler;
