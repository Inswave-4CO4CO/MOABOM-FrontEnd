import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../store/useAuthStore";
import { Spinner } from "@chakra-ui/react";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const { setLogin } = useAuthStore();
  const alreadyNavigatedRef = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const userId = params.get("email");

    if (accessToken && userId) {
      setLogin(accessToken, userId);
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

  return <Spinner size="sm" color="#FFA07A" />;
};

export default OAuth2RedirectHandler;
