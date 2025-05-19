import { FaRegUserCircle, FaSearch } from "react-icons/fa";
import HeaderButton from "./HeaderButton";
import InputBtnGroup from "./InputBtnGroup";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { Menu, Portal } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkAuth, logout } from "../services/api/auth";
import { toast } from "react-toastify";
import {
  ButtonWrapContainer,
  HeaderContainer,
  InputBtnGroupContainer,
} from "../styles/components/Header";

const Header = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const { data, isError } = useQuery({
    queryKey: ["userInfo"],
    queryFn: checkAuth,
    enabled: !!token, // 토큰이 있을 때만 실행
    retry: false,
  });

  const isLogin = !!data && !isError;

  const queryClient = useQueryClient();

  const { mutate: logoutUser } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("로그아웃 되었습니다.");
    },
    onMutate: () => {
      // 실패해도 토큰/캐시 삭제 > 보안적으로 좋음
      localStorage.removeItem("accessToken");
      queryClient.removeQueries({ queryKey: ["userInfo"] });
      navigate("/");
    },
  });

  return (
    <HeaderContainer>
      <Logo />
      <InputBtnGroupContainer>
        <InputBtnGroup placeholder="검색어를 입력하세요">
          <FaSearch />
        </InputBtnGroup>
      </InputBtnGroupContainer>
      <ButtonWrapContainer>
        {isLogin ? (
          <LoginContainer>
            <HeaderButton
              style={{ marginRight: "20px" }}
              onClick={() => navigate("/")}
            >
              OTT 추천받기
            </HeaderButton>
            <Menu.Root>
              <Menu.Trigger asChild>
                <HeaderButton>
                  <FaRegUserCircle />
                </HeaderButton>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item
                      value="new-txt"
                      onClick={() => navigate("/profile")}
                    >
                      마이페이지
                    </Menu.Item>
                    <Menu.Item value="new-file" onClick={() => logoutUser()}>
                      로그아웃
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          </LoginContainer>
        ) : (
          <HeaderButton
            style={{ float: "right" }}
            onClick={() => navigate("/login")}
          >
            로그인
          </HeaderButton>
        )}
      </ButtonWrapContainer>
    </HeaderContainer>
  );
};

export default Header;
