import { FaRegUserCircle, FaSearch } from "react-icons/fa";
import HeaderButton from "./HeaderButton";
import InputBtnGroup from "./InputBtnGroup";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { Menu, Portal } from "@chakra-ui/react";
import {
  ButtonWrapContainer,
  HeaderContainer,
  InputBtnGroupContainer,
  FloatContainer,
} from "../styles/components/Header";
import useAuthStore from "../store/useAuthStore";
import { useLogin } from "../hooks/useLogin";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { isLogin } = useAuthStore();
  const { logoutUser } = useLogin();

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/search");
    }
    setSearchQuery("");
  };

  return (
    <HeaderContainer>
      <Logo />
      <InputBtnGroupContainer>
        <InputBtnGroup
          placeholder="검색어를 입력하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          handleClick={handleSearch}
        >
          <FaSearch />
        </InputBtnGroup>
      </InputBtnGroupContainer>
      <ButtonWrapContainer>
        {isLogin ? (
          <FloatContainer>
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
                    <Menu.Item value="new-file" onClick={handleLogout}>
                      로그아웃
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          </FloatContainer>
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
