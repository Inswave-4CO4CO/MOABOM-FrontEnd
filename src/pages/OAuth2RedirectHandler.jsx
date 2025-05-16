import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken !== "" && refreshToken !== "") {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      toast.success("구글 로그인 성공!");
      navigate("/"); // 메인 페이지로 이동
    } else {
      toast.error("구글 로그인에 실패했습니다.");
      navigate("/login");
    }
  }, [navigate]);

  return <div>구글 로그인 처리 중...</div>;
};

export default OAuth2RedirectHandler;
