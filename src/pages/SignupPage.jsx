import { Center, Group, Input, Stack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import BodyButton from "../components/BodyButton";
import { LoginContainer } from "../styles/pages/LoginPage";
import { toast } from "react-toastify";
import Logo from "../components/Logo";
import { useSignup } from "../hooks/useSignup";
import LabelInput from "../components/LabelInput";
import InputBtnGroup from "../components/InputBtnGroup";

const SignupPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickName, setNickName] = useState("");

  const { userSignup, userIdCheck, setIsIdChecked, isIdChecked } = useSignup();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.warn("비밀번호가 일치하지 않습니다");
      return;
    }
    if (!isIdChecked) {
      toast.warn("아이디 중복 확인을 해주세요.");
      return;
    }
    if (nickName === "") {
      toast.warn("닉네임을 입력해주세요.");
      return;
    }

    userSignup({ userId, password, nickName });
  };

  return (
    <Center style={{ marginTop: "100px" }}>
      <Stack spacing={2}>
        <Logo />
        <LoginContainer>
          <VStack spacing={8}>
            <form style={{ width: "100%" }} onSubmit={handleSignup}>
              <VStack spacing={4} align="stretch">
                <Text>아이디</Text>
                <InputBtnGroup
                  placeholder="아이디"
                  onChange={(e) => {
                    setUserId(e.target.value);
                    setIsIdChecked(false);
                  }}
                  handleClick={() => userIdCheck(userId)}
                >
                  아이디 확인
                </InputBtnGroup>
                <LabelInput
                  label="비밀번호"
                  isPassword={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <LabelInput
                  label="비밀번호 확인"
                  isPassword={true}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <LabelInput
                  label="닉네임"
                  onChange={(e) => setNickName(e.target.value)}
                />
                <BodyButton
                  style={{ width: "100%", margin: "10px 0" }}
                  type="submit"
                >
                  회원가입
                </BodyButton>
              </VStack>
            </form>
          </VStack>
        </LoginContainer>
      </Stack>
    </Center>
  );
};

export default SignupPage;
